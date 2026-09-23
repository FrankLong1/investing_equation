---
name: evidence-intake
description: Turn a raw source artifact (filing, transcript, dataset, article) into a validated, time-checked, source-spanned claim ledger and route it to every affected covered asset. Use when new external evidence arrives, when a coverage sweep is due, or before any thesis work that will rely on a document. Does not form theses or judge assets.
---

# Evidence Intake

Nodes E1–E5. Primitives: filter → refine → filter → filter → filter.
Routes: [`ROUTING.md` §1](../ROUTING.md). Constants: [`POLICY-V0.md` §1](../POLICY-V0.md).
Envelope and store: [`OBJECTS.md`](../OBJECTS.md).

## When To Use

- A new source artifact enters the system.
- A covered asset is due for refresh (`POLICY.cadence.covered_asset_full_refresh_days`).
- Any downstream skill needs a claim that is not yet in the ledger.

Do **not** use this to decide whether an asset is attractive. This skill has no
opinion about any thesis. Its entire job is to make claims checkable and to
guarantee that nothing material is silently dropped.

## Required Inputs

| Input | Required | Note |
| --- | --- | --- |
| Raw source artifact | yes | Preserved verbatim; derived forms never replace it |
| `run.as_of_time` | yes | From the run manifest, never inferred |
| Coverage graph | yes | `state/coverage/graph.json` |
| Candidate-thesis index | yes | Needed for E5 fan-out |
| `policy@0.1.0` | yes | |

Missing any input → `abstain`, route to `queues/escalation/`. Never fill a
missing input by inference.

## Nodes

### E1 `source.check` — filter

Decide whether this source may be used at all. Three tests, in order:

1. **Availability.** Is `available_time ≤ as_of_time`? Not "was it published" —
   could the process have accessed it? Apply
   `POLICY.evidence.availability_leakage_tolerance_hours` as strict no-lookahead.
2. **Freshness.** Is the artifact within the configured
   `POLICY.evidence.staleness_ttl_days` for its type? An unset duration cannot
   be treated as fresh by default.
3. **Scope.** Does it plausibly touch a covered asset, a read-through entity, or
   a known representation gap?

Emit: `admit` | `stale` | `unavailable_at_as_of` | `out_of_scope` | `unreadable`.

Do not read the content for investment meaning at this node.

### E2 `claim_ledger.compile` — refine

Extract the smallest useful claims. For each:

- exact quoted span (`POLICY.evidence.require_source_span` — a document-level
  citation is not a span and should fail the proposed `span_present` validator);
- speaker or issuer, and whether they are an interested party;
- epistemic type: `observation` | `fact_claim` | `inference` | `forecast`;
- units, period, and basis where numeric;
- `event_time` and `available_time` separately;
- `derives_from`: which other claim or source this restates, if any.

**Never elevate an issuer's assertion to a fact.** A CEO saying demand is strong
is a `fact_claim` by an interested party, not an `observation`.

Emit: `compiled` | `partial_compiled` | `no_material_claims` | `missing_source_spans`.

On `partial_compiled`, name the uncompiled spans in `residual_route`. Proceeding
is allowed; silence is not.

### E3 `lineage_time.route` — filter

In an implementation, run after the deterministic `no_leakage` validator, not
instead of it. That validator is specified in `OBJECTS.md` but not implemented
in this registry.

- Any claim with `available_time > as_of_time` → `leakage_detected`, and the
  **whole ledger** quarantines. A ledger with one leaked claim cannot be trusted
  to have caught the others.
- Any claim whose `derives_from` chain does not resolve → `lineage_broken`.
- Incompatible claims → `conflict_unresolved`, and both are **preserved with
  both sources** (`POLICY.evidence.conflict_resolution = preserve`). Do not pick
  a winner. Do not average.

Emit: `time_valid` | `leakage_detected` | `lineage_broken` | `conflict_unresolved`.

### E4 `independence.route` — filter

For each material claim (≥`POLICY.evidence.material_claim_value_share` of any
thesis's ΔF), walk the `derives_from` closure and count **distinct primary
sources**, not distinct documents.

Four outlets reporting one filing is one source. A sell-side note restating a
transcript line is not corroboration of that line.

Emit per claim: `independent` | `corroborative` | `duplicate` | `circular` |
`insufficient_independent_support`.

`circular` demotes the claim below material threshold permanently — it may
inform, it may never carry a thesis.

### E5 `thesis_update.route` — filter

Fan-out. Emit one route **per affected covered asset**, with the causal path
named for each.

The failure this node exists to prevent is the indirect read-through that
reaches no one. A supplier's capacity comment affects the customer's cost line;
if only the supplier is covered, the customer's thesis never learns.

Emit per asset: `update_market_view` | `update_variant_view` | `monitor_only` |
`cross_check` | `corpus_only` | `representation_gap` | `no_affected_asset`.

`representation_gap` means material evidence with no covered asset to attach to.
**A non-empty representation-gap queue is a coverage finding, not an error** —
it shows where coverage may need to expand.

## Output

`claim_ledger` object per `OBJECTS.md` envelope, plus one `disposition` object
per E5 route. `object_state: derived`.

## Prohibited Decisions

- Stating whether any thesis is true.
- Stating whether any position should change.
- Resolving a conflict between sources.
- Promoting an interested party's assertion to `observation`.
- Dropping material content without setting `residual_route`.

## Quality Checks

- Can an independent reviewer open every retained source and land on the exact
  quoted span?
- Is every epistemic type no stronger than its support?
- Does the independence count reflect primary sources rather than document count?
- Can every excluded-but-material item be found in a queue?
- Would a reviewer reach the same E5 fan-out from the same ledger?

## Common Failure Modes

- Document-level citations passed off as spans.
- Echo chains counted as corroboration.
- Conflicts quietly resolved toward the more convenient claim.
- Read-throughs routed only to the obvious first-order name.
- Forecasts recorded as facts because they appeared in a filing.
