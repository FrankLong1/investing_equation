# Routing — If The Agent Does Y, Then Z

Status: provisional
Version: `routing@0.1.0`

## Why This File Exists

The skill contracts name dispositions; this document gives each one a proposed
destination. A diagram of the main path does not specify what happens on
abstention, repair, or escalation, so those branches are recorded here.

## The Totality Rule

**Every (node × disposition) pair should have exactly one row in this file.**
There are no implied defaults. The included registry script checks disposition
labels across the documents and detects duplicate rows within a node; it does
not yet prove that every skill emission is routed by the correct node. A future
`state_transition_legal` validator should check each proposed transition against
these tables and fail anything absent.

A node may only emit dispositions listed for it here. A skill that wants a new
disposition edits this file first.

## Node Registry

Seven skills, twenty-four nodes. Node IDs are stable; skill names are the
human-facing surface.

| Skill | Nodes | Primitive sequence |
| --- | --- | --- |
| `evidence-intake` | E1–E5 | filter → refine → filter → filter → filter |
| `market-view-reconstruction` | M1–M3 | filter → refine → filter |
| `variant-thesis-build` | V1–V6 | hypothesize → filter → refine → hypothesize → filter → filter |
| `recognition-path-build` | R1–R2 | refine → filter |
| `sizing-input-build` | S1–S3 | refine → refine → filter |
| `timing-posture-build` | T1–T2 | refine → filter |
| `outcome-review` | O1–O3 | filter → refine → filter |

Non-LLM services referenced as destinations: `SVC:expectations-snapshot`,
`SVC:scenario-calculator`, `SVC:risk-and-liquidity`, `SVC:optimizer`,
`SVC:hard-limits`, `SVC:blotter`. These are proposed code services, not prompts;
none is implemented in this registry. A skill routing to one of them should
stop and wait for its result.

---

## 1. `evidence-intake`

### E1 `source.check` — filter

| Disposition | Then |
| --- | --- |
| `admit` | → E2 |
| `stale` | → `queues/residual/`, tag with the TTL breached. Terminal for this run; re-enters on a fresher artifact. |
| `unavailable_at_as_of` | → `queues/residual/`. **Never repair.** Look-ahead is a void, not a haircut (`POLICY.evidence.availability_leakage_tolerance_hours` requires strict no-lookahead). |
| `out_of_scope` | → `objects/disposition/`, terminal. Reason code required. |
| `unreadable` | → `queues/escalation/`. A source that cannot be opened is an infrastructure defect, not a research finding. |

### E2 `claim_ledger.compile` — refine

| Disposition | Then |
| --- | --- |
| `compiled` | → E3 |
| `partial_compiled` | → E3, with `residual_route` naming the uncompiled spans. Proceeding is allowed; silence is not. |
| `no_material_claims` | → `objects/disposition/`, terminal. The artifact is retained in the corpus and never re-run. |
| `missing_source_spans` | → `repair` (E2), budget `POLICY.loop.max_repair_attempts` |

### E3 `lineage_time.route` — filter

| Disposition | Then |
| --- | --- |
| `time_valid` | → E4 |
| `leakage_detected` | → `objects/<type>/` with `object_state: quarantined`, terminal. The **whole ledger** quarantines, not the offending claim — a ledger with one leaked claim cannot be trusted to have found the others. |
| `lineage_broken` | → `repair` (E2). The ledger, not the source, is what failed. |
| `conflict_unresolved` | → E4 **with the conflict preserved** (`POLICY.evidence.conflict_resolution = preserve`). Not a blocker. Conflicts propagate visibly; they are never averaged. |

### E4 `independence.route` — filter

| Disposition | Then |
| --- | --- |
| `independent` | → E5 |
| `corroborative` | → E5, claim marked as supporting not primary |
| `duplicate` | → E5, claim collapsed into its primary, `derives_from` preserved |
| `circular` | → E5 with the claim **demoted below material threshold**. It may inform, it may never carry ≥`POLICY.evidence.material_claim_value_share` of a thesis. |
| `insufficient_independent_support` | → E5, claim tagged; if it is load-bearing, V6 will later return `insufficient_evidence`. Does not block here — evidence intake does not know what will need the claim. |

### E5 `thesis_update.route` — filter

Emits one route **per affected covered asset**. Fan-out node.

| Disposition | Then |
| --- | --- |
| `update_market_view` | → `market-view-reconstruction` (M1) for that asset |
| `update_variant_view` | → `variant-thesis-build` (V1), reusing the current market driver map |
| `monitor_only` | → coverage graph timestamp updated, no downstream run. Resets coverage debt. |
| `cross_check` | → `market-view-reconstruction` (M1) with the conflicting claim attached |
| `corpus_only` | → searchable corpus, terminal |
| `representation_gap` | → `queues/representation_gap/`. Material evidence with no covered asset to attach to. **This queue being non-empty is a coverage finding, not an error.** |
| `no_affected_asset` | → `objects/disposition/`, terminal, reason code required |

---

## 2. `market-view-reconstruction`

### M1 `snapshot.check` — filter

| Disposition | Then |
| --- | --- |
| `snapshot_complete` | → M2, `validation_status: valid` |
| `snapshot_missing` | → M2, `validation_status: degraded`. Runs on prose alone. A degraded map may **never** reach a terminal decision state (see Invariant 6). |
| `snapshot_stale` | → `SVC:expectations-snapshot`, then re-enter M1. Not a repair — the fix is upstream data, not a better prompt. |

### M2 `market_driver_map.compile` — refine

| Disposition | Then |
| --- | --- |
| `compiled` | → M3 |
| `insufficient_evidence` | → `objects/disposition/`, terminal for this cycle. Next trigger: `POLICY.cadence.covered_asset_full_refresh_days`. |

### M3 `market_map.check` — filter

| Disposition | Then |
| --- | --- |
| `map_admitted` | → V1 |
| `underdetermined_market_view` | → `objects/disposition/`, terminal. Fires when residual exceeds `POLICY.market.max_unexplained_price_residual` or driver coverage is below `POLICY.market.min_driver_importance_coverage`. **This is a successful result**, not a failure — it means the process cannot establish what is priced, which is exactly the thing it must not guess. |
| `single_story` | → `repair` (M2). Fewer alternative interpretations than `POLICY.market.min_alternative_interpretations`. |
| `repair` | → M2, budget `POLICY.loop.max_repair_attempts` |

---

## 3. `variant-thesis-build`

Contains both hypothesize nodes. **Quarantine invariant: V1 and V4 write
`candidate_only` objects that only V2 and V5 may read.** No refine node and no
service may take a `candidate_only` object as input. An implementation must
enforce this with the proposed `quarantine_respected` validator, not a prompt.

### V1 `persistence.propose` — hypothesize

| Disposition | Then |
| --- | --- |
| `candidate_emitted` | → V2 |
| `no_candidate` | → `objects/disposition/`, terminal. If no mechanism can explain why the market holds its view, there is no variant thesis to build. |

### V2 `persistence.check` — filter

| Disposition | Then |
| --- | --- |
| `admit` | → V3 |
| `g_m_not_a_mechanism` | → `repair` (V1). Fires on "the market is inattentive" and anything outside `POLICY.variant.permitted_G_M_mechanisms`. |
| `unobservable_mechanism` | → `repair` (V1) |
| `duplicate` | → collapse into the existing admitted `G_M`, → V3 |
| `reject` | → `objects/disposition/`, terminal |
| `abstain` | → `queues/escalation/` on missing input |

### V3 `variant_claim.compile` — refine

| Disposition | Then |
| --- | --- |
| `compiled` | → V4 |
| `no_material_variant` | → `objects/disposition/`, terminal. Fires below `POLICY.variant.min_delta_F_share` or `POLICY.variant.min_delta_P`. **Counts toward the abstention band** (`POLICY.health.abstention_band`). |

### V4 `disconfirming_world.propose` — hypothesize

| Disposition | Then |
| --- | --- |
| `candidate_emitted` | → V5 |
| `no_coherent_counterworld` | → `queues/escalation/`. A variant claim nobody can argue against is more likely underspecified than certain — this routes to a human, not to admission. |

### V5 `disconfirming_world.check` — filter

| Disposition | Then |
| --- | --- |
| `admit` | → V6 |
| `contradicts_accepted_fact` | → `repair` (V4) |
| `does_not_change_central_claim` | → `repair` (V4). The counterworld only negated the conclusion. |
| `assumption_load_too_high` | → `repair` (V4). Above `POLICY.variant.max_counterworld_added_assumptions`. |
| `duplicate_candidate` | → collapse, → V6 |
| `no_discriminating_observation` | → `repair` (V4) |
| `reject` | → V6 with `falsifier_strength: weak` recorded. Does not block: a weak countercase is a disclosed limitation, not a stop. |
| `abstain` | → `queues/escalation/` |

### V6 `variant_claim.check` — filter

The admission gate for everything downstream.

| Disposition | Then |
| --- | --- |
| `expression_ready` | → `recognition-path-build` (R1) |
| `research_only` | → `objects/disposition/`, terminal. Next trigger required. Counts toward abstention band. |
| `no_material_variant` | → `objects/disposition/`, terminal |
| `insufficient_evidence` | → `objects/disposition/`, terminal. Fires when a load-bearing claim was tagged at E4 and never gained independent support. |
| `hold_for_repair` | → `repair` (V3), budget `POLICY.loop.max_repair_attempts` |
| `escalate` | → `queues/escalation/` |

---

## 4. `recognition-path-build`

### R1 `recognition_path.compile` — refine

| Disposition | Then |
| --- | --- |
| `compiled` | → R2 |
| `no_credible_recognition_path` | → `objects/disposition/`, terminal, thesis reverts to `research_only`. Fires on a calendar date with no disputed fact attached — the paper's earnings rule, enforced. |

### R2 `recognition_path.check` — filter

| Disposition | Then |
| --- | --- |
| `admitted` | → `SVC:scenario-calculator`, then `sizing-input-build` (S1) |
| `horizon_too_long` | → `objects/disposition/`, `research_only`. Above `POLICY.recognition.max_horizon_months`. |
| `q_T_below_floor` | → `objects/disposition/`, `research_only`. Below `POLICY.recognition.min_q_T`. A correct thesis the market will not recognize is still not a position. |
| `catalyst_window_too_wide` | → `repair` (R1). Above `POLICY.recognition.max_catalyst_window_days` — re-underwrite as gradual re-rating rather than as an event. |
| `no_observable_revelation` | → `repair` (R1) |
| `repair` | → R1, budget `POLICY.loop.max_repair_attempts` |

---

## 5. `sizing-input-build`

### S1 `payoff_casebook.compile` — refine

| Disposition | Then |
| --- | --- |
| `compiled` | → S2 |
| `not_modelable` | → `objects/disposition/`, `research_only`. Causal path, units, baseline, or horizon are not specified enough for the calculator to run without guessing. |

### S2 `sizing_input.compile` — refine

| Disposition | Then |
| --- | --- |
| `compiled` | → S3 |
| `missing_risk_inputs` | → `SVC:risk-and-liquidity`, then re-enter S2. Volatility, borrow, crowding, and liquidity are measured, not estimated in prose. |

### S3 `sizing_input.check` — filter

| Disposition | Then |
| --- | --- |
| `admitted` | → `SVC:optimizer` → `SVC:hard-limits` → `timing-posture-build` (T1) |
| `below_ev_hurdle` | → `objects/disposition/`, proposed allocation zero, thesis stays active and monitored. Below `POLICY.expression.min_expected_value_hurdle`. **A zero weight is not a rejected thesis** — the paper is explicit on this and the routing preserves it. |
| `conviction_words_only` | → `repair` (S2). Adjectives where a distribution was required. |
| `weight_emitted` | → **hard fail**, → `queues/escalation/`. The model produced a portfolio weight (`POLICY.expression.llm_may_emit_weight = false`). This is a control breach, logged as such. |
| `repair` | → S2, budget `POLICY.loop.max_repair_attempts` |

---

## 6. `timing-posture-build`

### T1 `timing_posture.compile` — refine

| Disposition | Then |
| --- | --- |
| `compiled` | → T2 |
| `no_timing_edge` | → T2 carrying posture `wait`. An explicit, valid, recorded output — not a failure to produce one. |

### T2 `action_admissibility.check` — filter

| Disposition | Then |
| --- | --- |
| `approved_for_human_review` | → human gate → `SVC:blotter`. **The model never authorizes.** |
| `no_action` | → `objects/disposition/`, terminal, **next review trigger required**. "Wait for a better entry" with no condition is rejected as `repair`. |
| `wait_for_trigger` | → monitor with the named observable and date |
| `blocked` | → `queues/escalation/` with every failed control and required approver listed |
| `escalate` | → `queues/escalation/` |
| `repair` | → T1, budget `POLICY.loop.max_repair_attempts` |

---

## 7. `outcome-review`

### O1 `learning.check` — filter

| Disposition | Then |
| --- | --- |
| `reviewable` | → O2 |
| `no_frozen_record` | → `queues/escalation/`. Cannot learn from a decision whose ex-ante state was never frozen. This is a process defect and should be loud. |
| `too_early` | → schedule at the recognition clock, terminal for now |

### O2 `outcome_attribution.compile` — refine

| Disposition | Then |
| --- | --- |
| `compiled` | → O3 |
| `attribution_ambiguous` | → O3 with competing hypotheses **preserved**. Never collapse to a single cause to make the review read cleanly. |

### O3 `recompute.route` — filter

| Disposition | Then |
| --- | --- |
| `rerun_evidence` | → E2 for the named asset |
| `rerun_market_view` | → M1 |
| `rerun_variant` | → V1 |
| `rerun_recognition` | → R1 |
| `rerun_sizing` | → S1 |
| `rerun_timing` | → T1 |
| `policy_defect` | → `queues/escalation/`. The object was fine; the threshold was wrong. **This is the highest-value output in the system** — it is the only route by which `POLICY-V0` gets calibrated. |
| `no_change` | → terminal, **next review trigger required** |
| `postmortem_only` | → journal, no rerun |

All rerun routes are bounded by `POLICY.loop.max_rerun_depth`.

---

## Global Invariants

These invariants require deterministic validators. The validators are specified
here but are not implemented in this registry.

1. A `candidate_only` object is readable only by its named admission filter.
2. A refine node never erases or replaces its source objects.
3. A filter never repairs the object it is judging — it routes.
4. No LLM node emits a portfolio weight, an order, or an approval.
5. Every terminal state carries a reason code and, unless permanently closed, a
   next review trigger.
6. A `degraded` object may traverse the DAG but may never reach
   `approved_for_human_review`.
7. `repair` is bounded by `POLICY.loop.max_repair_attempts`; exhaustion routes to
   `queues/escalation/` and **never** to `reject`. An object that ran out of
   budget is a process failure, and rejecting it silently hides the defect.
8. Material content dropped at any node sets `residual_route`. Silent drop is
   the one failure the architecture exists to prevent.

## Terminal States

The complete set. Each counts in process-health accounting
(`POLICY.health.abstention_band`).

| Terminal | Counts as | Next trigger |
| --- | --- | --- |
| `approved_for_human_review` | decision | human gate |
| `no_action` | decision | required |
| `below_ev_hurdle` (weight 0) | decision | monitor |
| `research_only` | abstention | required |
| `no_material_variant` | abstention | refresh cadence |
| `insufficient_evidence` | abstention | new evidence |
| `underdetermined_market_view` | abstention | new snapshot |
| `no_credible_recognition_path` | abstention | new catalyst |
| `out_of_scope` / `corpus_only` | neither | none |
| `quarantined` | control event | human |
| `escalated` | control event | human |

A cycle whose decisions are all abstentions, or whose abstention share falls
outside `POLICY.health.abstention_band`, raises a process exception. The system
is not permitted to abstain its way to a clean audit.
