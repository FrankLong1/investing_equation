---
name: recognition-path-build
description: Specify the mechanism by which the market's maintained error becomes harder to hold — barrier, revelation, transmission, clock, and conditional recognition probability — and gate whether it is credible enough to justify owning risk. Use after variant-thesis-build returns expression_ready. Converts a research view into an investable thesis, or explicitly declines to.
---

# Recognition Path Build

Nodes R1–R2. Primitives: refine → filter.
Routes: [`ROUTING.md` §4](../ROUTING.md). Constants: [`POLICY-V0.md` §4](../POLICY-V0.md).

## When To Use

- `variant-thesis-build` returned `expression_ready`.
- A catalyst passed, or failed to reveal what it was supposed to, and the path
  needs re-underwriting.

## The Rule This Skill Enforces

> If the recognition path cannot be specified as a mechanism that closes `G_M`,
> the work is a research view, not yet an investable thesis.

The skill records `q_T` and a recognition horizon. Their admissible bounds
must come from a configured policy instance before a decision route can run.

**Earnings are a calendar event, not a catalyst.** They become one only when they
reveal the *disputed fact* — for example, a third consecutive quarter of
gross-margin performance that breaks the market's "temporary mix benefit"
explanation. A date on which information arrives is not a mechanism.

## Required Inputs

| Input | Required |
| --- | --- |
| Admitted `variant_claim` (with `G_M`) | yes |
| `market_driver_map` | yes |
| Catalyst evidence: event calendar, disclosure history, KPI cadence | yes |
| Positioning and ownership snapshot | no, improves transmission |
| `policy@0.1.0` | yes |

## Nodes

### R1 `recognition_path.compile` — refine

Fill every field. A blank is a fail, not a soft spot.

| Field | Question |
| --- | --- |
| Current barrier | What is `G_M`, and why does it let the market view persist today? |
| Recognition path | What discrete catalyst, datapoint, or gradual re-rating challenges that barrier? |
| Revelation | What becomes **observable**, and why does it favour the variant view? |
| Transmission | How does the new evidence change forecasts, valuation, or the marginal price setter? |
| Clock | By when, and with what probability? |
| Disconfirming path | What would show the recognition mechanism itself has failed? |

Then state:

```text
q_T = Pr(R causes recognition of the variant view by horizon T | V_V is right)
```

`q_T` is conditional on the variant view being **right**. It is not confidence in
the thesis — that is fundamental conviction and belongs in sizing. Conflating the
two is the most common error at this node: a thesis can be 80% likely true and
still have a 20% chance of being recognized inside the horizon, and that
combination is not a position.

Emit: `compiled` | `no_credible_recognition_path`.

### R2 `recognition_path.check` — filter

| Test | Constant | Failure |
| --- | --- | --- |
| Horizon within cap | `POLICY.recognition.max_horizon_months` | `horizon_too_long` |
| Recognition probability | `POLICY.recognition.min_q_T` | `q_T_below_floor` |
| Catalyst window | `POLICY.recognition.max_catalyst_window_days` | `catalyst_window_too_wide` |
| Observable revelation named | `POLICY.recognition.require_observable_revelation` | `no_observable_revelation` |

Emit: `admitted` | `horizon_too_long` | `q_T_below_floor` |
`catalyst_window_too_wide` | `no_observable_revelation` | `repair`.

`catalyst_window_too_wide` does not kill the thesis — it means the work was
underwritten as an event when it is really a gradual re-rating, and it should be
recompiled as one.

`q_T_below_floor` is the gate that most needs to bite. A correct thesis the
market will not recognize inside the horizon consumes risk budget the entire
time and pays nothing. Reverting it to `research_only` is the right answer, not
a failure of nerve.

## Output

`recognition_path` object. Required body: `barrier_ref` (to `G_M`),
`catalyst_type` (`discrete` | `gradual`), `revelation`, `transmission`,
`marginal_price_setter_hypothesis`, `horizon_months`, `catalyst_window`, `q_T`,
`disconfirming_path`, `next_review_trigger`.

On admission, routes to `SVC:scenario-calculator` before sizing. The calculator
runs the numbers; this skill never does.

## Prohibited Decisions

- Computing a target price or a payoff.
- Inventing a second recognition mechanism when sizing or timing later needs one —
  timing consumes this record, it does not replace it.
- Using `q_T` as a proxy for conviction in the thesis being true.
- Naming a specific person as the marginal buyer. The requirement is a
  falsifiable view of the market's reaction function, not a story about an
  individual.

## Quality Checks

- Does the revelation name something an outside observer could actually see?
- Does the mechanism close `G_M`, or merely coincide with a date?
- If the catalyst passes and price does not move, does the disconfirming path
  tell us the mechanism failed — or would we relabel it a timing problem?
- Is `q_T` conditional on the view being right, or has conviction leaked into it?
- Is the horizon the thesis's, or the analyst's patience?

## Common Failure Modes

- "Next earnings" with no disputed fact attached.
- Transmission that stops at "the market will notice".
- `q_T` set at a round number with no reasoning.
- A gradual re-rating dressed as a discrete catalyst to fit a window.
- Recognition paths that are really just the thesis restated in the future tense.
