---
name: sizing-input-build
description: Compile the scenario payoff casebook and the structured sizing input — probability distributions, conditional payoffs, volatility and tail risk, crowding, liquidity, and uncertainty haircuts — for a thesis with an admitted recognition path. Use before the portfolio optimizer runs. Emits distributions and haircuts only; never a portfolio weight.
---

# Sizing Input Build

Nodes S1–S3. Primitives: refine → refine → filter.
Routes: [`ROUTING.md` §5](../ROUTING.md). Constants: [`POLICY-V0.md` §7](../POLICY-V0.md).

## When To Use

- `recognition-path-build` returned `admitted` and the scenario calculator has run.
- Risk state changed materially on an existing position (vol regime, borrow,
  crowding, liquidity) and the sizing input is stale.

## The Hard Boundary

**This skill may not produce a portfolio weight.** Not a target, not a range, not
a "roughly 3%", not a risk-budget percentage dressed as a suggestion. The output
is a bounded input record; the optimizer and hard-limit engine own the number.

The paper's own separation-of-concerns principle requires this, and the failure
it prevents is specific: an LLM that can emit a weight will convert rhetorical
conviction into capital, and the audit trail will show a number with a story
attached rather than a number with a computation attached.

`POLICY.expression.llm_may_emit_weight = false`. A weight in the output is a
**control breach** — disposition `weight_emitted`, straight to escalation, logged
as such. Not a repair.

## Required Inputs

| Input | Required |
| --- | --- |
| Admitted `variant_claim` + `recognition_path` | yes |
| Scenario calculator output | yes | from `SVC:scenario-calculator` |
| Risk and liquidity measurements | yes | from `SVC:risk-and-liquidity` |
| Portfolio state `S` and constraints `K` | yes |
| `policy@0.1.0` | yes |

## Nodes

### S1 `payoff_casebook.compile` — refine

One entry per perspective. Never blend.

```text
probability
× target value / return from today's price
× time to realization
× adverse path and loss if wrong or delayed
```

Each case carries its own model version and assumption set. A blended expected
return with no traceable cases is the thing this node exists to prevent.

Emit: `compiled` | `not_modelable`.

`not_modelable` fires when causal path, units, baseline, or horizon are not
specified enough for the calculator to run without guessing — a real and common
outcome, and better than a model that guessed.

### S2 `sizing_input.compile` — refine

Compile the record. Every field is a distribution, a range, or a measurement —
never an adjective.

```yaml
sizing_input:
  thesis_ref:
  volatility_and_tail_risk:          # measured; include event and gap risk, downside skew, stress correlation
  fundamental_probability_distribution:   # confidence the variant view is TRUE
  market_belief_and_pricedness_confidence: # from the driver map's residual and measurement basis
  conditional_upside_downside_and_horizon:
  recognition_path_confidence_and_risk:   # q_T and its uncertainty
  positioning_and_crowding_assessment:    # ownership, HF/LO positioning, short interest, borrow, dealer state, flows
  liquidity_and_exit_assessment:          # ADV, exit days, one-crowded-door risk
  proposed_risk_allocation:               # a RISK BUDGET REQUEST, not a weight
  uncertainty_haircuts: []
  portfolio_constraints_to_check: []
  missing_inputs: []
```

Keep the four judgments separate. They answer different questions and collapse
easily:

| Judgment | Question |
| --- | --- |
| Fundamental conviction | How likely is the variant view to be **true**? |
| Pricedness confidence | How well do we know what is **already priced**? |
| Recognition confidence | Will the market **notice**, in time? |
| Crowding and liquidity | Can we hold the position and get **out**? |

A thesis can score high on all four and still deserve zero weight after
portfolio correlation. That is the optimizer's call, not this skill's.

Apply the sizing mnemonic as a **reasoning check only**, never as arithmetic:

```text
                 fundamental conviction × mispricing-adjusted payoff × recognition confidence
risk allocation ∝ ─────────────────────────────────────────────────────────────────────────
                            volatility and tail risk × crowding and liquidity risk
```

Emit: `compiled` | `missing_risk_inputs`.

### S3 `sizing_input.check` — filter

| Test | Failure |
| --- | --- |
| Every numeric field is a distribution or measurement, not an adjective | `conviction_words_only` |
| Probability-weighted return after haircuts ≥ `POLICY.expression.min_expected_value_hurdle` over the configured horizon | `below_ev_hurdle` |
| No weight, target position, or order quantity anywhere in the object | `weight_emitted` (hard fail) |
| Schema complete, `missing_inputs` explicitly listed | `repair` |

Emit: `admitted` | `below_ev_hurdle` | `conviction_words_only` | `weight_emitted` | `repair`.

`below_ev_hurdle` sets proposed allocation to zero and **keeps the thesis
active and monitored**. A zero weight is a valid portfolio-construction result,
not a rejection of the candidate thesis — the paper is explicit on this and the
routing preserves it. The thesis re-enters when price, evidence, or risk changes.

## Output

`sizing_input` object → `SVC:optimizer` → `SVC:hard-limits` → `timing-posture-build`.

## Prohibited Decisions

- Any portfolio weight, target position, order, or share count.
- Blending scenarios into a single expected return without preserving cases.
- Substituting an adjective ("high conviction") for a distribution.
- Waiving or reinterpreting a constraint.
- Treating a crowded-short squeeze risk as merely a lower probability rather than
  a path risk that can make a correct thesis untradeable.

## Quality Checks

- Could the optimizer consume this without asking a clarifying question?
- Are the four judgments separable, or has conviction leaked across all of them?
- Is downside paired with probability and time, or recorded as a standalone
  target-price percentage?
- Does volatility rise precisely when the rest of the book is vulnerable — and is
  that stated?
- Is the expected exit one crowded door, and is the haircut recorded?

## Common Failure Modes

- Upside recorded without its adverse path.
- Trailing realized vol used as the whole risk estimate, ignoring event and gap risk.
- Crowding noted in prose and not applied as a haircut.
- `proposed_risk_allocation` quietly functioning as a weight.
- Missing inputs inferred rather than listed.
