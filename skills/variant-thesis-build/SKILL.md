---
name: variant-thesis-build
description: Build and stress a specified disagreement between the market view and a variant view on a material driver, including why the market can still hold its view and the cheapest world in which the variant view is wrong. Use after market-view-reconstruction admits a driver map. Produces an expression-ready variant claim or an explicit abstention. Never assigns direction, instrument, or size.
---

# Variant Thesis Build

Nodes V1–V6. Primitives: hypothesize → filter → refine → hypothesize → filter → filter.
Routes: [`ROUTING.md` §3](../ROUTING.md). Constants: [`POLICY-V0.md` §3](../POLICY-V0.md).

## When To Use

- `market-view-reconstruction` returned `map_admitted`.
- E5 routed `update_variant_view` and a current driver map exists.
- An existing variant claim needs re-underwriting after new evidence.

## The Quarantine Rule

This skill contains the only two `hypothesize` nodes in the system. Hypothesis
generation is where causal invention is *permitted* — and therefore where it
must be contained.

```text
V1/V4 write  →  object_state: candidate_only
                       ↓
             only V2/V5 may read it
                       ↓
        admitted → may enter refine or modeling
```

A `candidate_only` object is neither evidence nor an accepted claim. No refine
node and no numerical service may take one as input. An implementation must
enforce this with the proposed `quarantine_respected` validator in code, not by
asking the model to remember.

**One candidate per invocation.** If breadth is wanted, invoke V1 or V4 several
times under different perturbations, then deduplicate at the gate. A generator
allowed to emit several candidates will quietly rank them and present its favorite,
which collapses generation and selection into one unauditable step.

## Required Inputs

| Input | Required |
| --- | --- |
| Admitted `market_driver_map` | yes |
| Accepted claims from `evidence-intake` | yes |
| Prior `variant_claim` version | no |
| `policy@0.1.0` | yes |

## Nodes

### V1 `persistence.propose` — hypothesize

Propose **one** concrete mechanism `G_M` by which the market can maintain its
current view today despite contrary evidence.

Must name one of `POLICY.variant.permitted_G_M_mechanisms`:
`missing_evidence`, `different_causal_model`, `magnitude_disagreement`,
`timing_disagreement`, `risk_premium`, `market_mechanics`.

Carry: preserved inputs, the single thing changed, novelty basis against existing
candidates, added assumptions, a discriminating observation, a falsifier,
unknowns, and the named admission gate.

Emit: `candidate_emitted` | `no_candidate`.

### V2 `persistence.check` — filter

Reject `g_m_not_a_mechanism` on anything that reduces to "the market is
inattentive", "the market is short-term", or "nobody has done this work". Those
are not mechanisms — they are restatements of the disagreement, and they make the
recognition path unwritable later.

Also test observability: could an outside observer, in principle, see this
mechanism operating?

Emit: `admit` | `g_m_not_a_mechanism` | `unobservable_mechanism` | `duplicate` |
`reject` | `abstain`.

### V3 `variant_claim.compile` — refine

Compile the specified disagreement. The complete statement is:

> On driver *d*, the market view is `V_M`. The variant view is `V_V`, supported
> by evidence `E_V`. The market does not acknowledge it because `G_M`.

Then quantify: `ΔF` on the disputed driver, and `ΔP` from today's price if the
variant view is recognized.

Materiality gates (`no_material_variant` below either):
- `ΔF share ≥ POLICY.variant.min_delta_F_share`
- `|ΔP| ≥ POLICY.variant.min_delta_P`

Record what would disprove the variant view
(`POLICY.variant.require_falsifier`).

Emit: `compiled` | `no_material_variant`.

### V4 `disconfirming_world.propose` — hypothesize

Preserve every accepted fact. Change the **fewest** central causal assumptions
needed to make the variant claim false. Emit one coherent world and one
observation that discriminates it from the variant world.

The test is explanatory economy, not plausibility alone: a countercase that
adds too many independent assumptions is less useful for constraining the
thesis. The permitted assumption load must come from configured policy.

Emit: `candidate_emitted` | `no_coherent_counterworld`.

`no_coherent_counterworld` routes to a **human**, not to admission. A variant
claim nobody can argue against is far more likely underspecified than certain.

### V5 `disconfirming_world.check` — filter

Ordered checks:

1. Preserves every accepted fact.
2. Actually negates or materially weakens the **central** claim — not the
   conclusion. "The stock does not go up" is not a counterworld.
3. Distinct from existing candidates.
4. Adds no more than the configured
   `POLICY.variant.max_counterworld_added_assumptions`.
5. Names a measurable discriminator and a falsifier.

Emit: `admit` | `contradicts_accepted_fact` | `does_not_change_central_claim` |
`assumption_load_too_high` | `duplicate_candidate` | `no_discriminating_observation` |
`reject` | `abstain`.

`reject` proceeds to V6 with `falsifier_strength: weak` recorded — a weak
countercase is a disclosed limitation, not a stop.

### V6 `variant_claim.check` — filter

The admission gate for everything downstream. Test, in order:

1. Materiality (ΔF, ΔP thresholds).
2. Evidence quality — is any load-bearing claim tagged
   `insufficient_independent_support` or `circular` from E4?
3. Market-view confidence — was the driver map `valid` or `degraded`?
4. Payoff estimability — can the calculator run without guessing?
5. Falsifier present and observable.
6. `G_M` admitted and mechanism-typed.
7. Time coherence — do the evidence, driver, and horizon refer to the same period?
8. Mandate eligibility.

Emit: `expression_ready` | `research_only` | `no_material_variant` |
`insufficient_evidence` | `hold_for_repair` | `escalate`.

A thesis reaches expression because every contract is present — never because it
is compelling.

## Output

`variant_claim` object. Required body: `driver`, `V_M`, `V_V`, `evidence_refs[]`,
`G_M` with `mechanism_type`, `delta_F`, `delta_P`, `falsifier`,
`disconfirming_world_ref`, `falsifier_strength`, `unknowns[]`.

## Prohibited Decisions

- Assigning direction, instrument, or size.
- Producing a target weight or price target.
- Treating a `candidate_only` object as evidence.
- Emitting more than one candidate per hypothesize invocation.
- Passing "the market is inattentive" as `G_M` in any wording.

## Quality Checks

- Is the record a *specified disagreement* rather than a bullish narrative?
- Could a reviewer explain, from `G_M` alone, why a rational market holds its
  current view today?
- Does the counterworld change the central causal claim, or only the conclusion?
- Is every material claim traceable to an independent primary source?
- Would the variant view survive if the market-driver map had been built by
  someone who disagreed with it?

## Common Failure Modes

- A variant view that is consensus with more conviction.
- `G_M` that restates the disagreement instead of explaining persistence.
- Counterworlds that negate the conclusion without touching the mechanism.
- ΔP computed from a target price rather than from the driver disagreement.
- Hypothesis output flowing into modeling without passing its gate.
