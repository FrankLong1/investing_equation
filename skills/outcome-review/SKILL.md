---
name: outcome-review
description: Compare a frozen ex-ante decision record against what actually happened, separate observed outcome from causal interpretation from process repair, and route the narrowest justified rerun upstream. Use at a review date, after a catalyst resolves, or when a position is exited. Never rewrites the original decision or infers causality from P&L.
---

# Outcome Review

Nodes O1–O3. Primitives: filter → refine → filter.
Routes: [`ROUTING.md` §7](../ROUTING.md). Constants: [`POLICY-V0.md` §5, §6](../POLICY-V0.md).

## When To Use

- A recognition clock expired or a catalyst resolved.
- A position was exited, or a thesis was invalidated.
- A scheduled review trigger fired.
- Process-health metrics fell outside `POLICY.health` bands.

## Why This Skill Matters Most

State update and learning determine whether a system becomes calibrated or
merely accumulates opinions. Outcome review supplies evidence for revising
configured policy parameters, with human review before a new version takes effect.

Perfect data does not tell you whether a thesis was wrong, early, poorly sized,
or badly expressed. Those are four different repairs pointing at four different
nodes, and P&L distinguishes none of them.

**A win can expose a bad process and a loss can expose a good one.** If reviews
consistently conclude that profitable decisions were good and unprofitable ones
were bad, the skill is not running — outcome bias is.

## Required Inputs

| Input | Required |
| --- | --- |
| Frozen decision record, all versions | yes |
| Realized facts: price, P&L, earnings, flows, liquidity, thesis evidence | yes |
| Original `variant_claim`, `recognition_path`, `sizing_input`, `timing_posture` | yes |
| `policy@0.1.0` at the time of the decision | yes — the version then, not now |

## Nodes

### O1 `learning.check` — filter

Is there something to learn from?

- Frozen ex-ante record with a stated prior expectation → `reviewable`
- No frozen record → `no_frozen_record` → **escalation**. You cannot learn from a
  decision whose ex-ante state was never captured. This is a process defect and
  should be loud, not quietly skipped.
- Recognition clock has not run → `too_early`, reschedule.

Emit: `reviewable` | `no_frozen_record` | `too_early`.

### O2 `outcome_attribution.compile` — refine

Keep these strictly separate. Collapsing them is the failure mode.

| Layer | Content | Rule |
| --- | --- | --- |
| **Observed outcome** | What happened. Price, P&L, reported numbers, evidence that arrived. | Facts only. No interpretation. |
| **Forecast deviation** | Where the ex-ante record differed from realized, field by field. | Mechanical comparison against the frozen record. |
| **Thesis assessment** | Was `V_V` right, wrong, partially right, or still unresolved? | Independent of P&L. A right thesis can lose money. |
| **Attribution hypotheses** | Competing explanations across thesis / sizing / timing / expression / recognition / luck. | **Plural.** Preserve competing hypotheses. |
| **Unresolved causal questions** | What cannot be settled from available evidence. | Say so rather than closing it. |
| **Repair question** | One question aimed at one node. | Must name a node. |

Then classify the error, if there was one:

```text
thesis wrong        → V_V was false                        → repair variant-thesis-build
thesis right, early → recognition did not occur in horizon → repair recognition-path-build (q_T calibration)
thesis right, small → sizing did not reflect the payoff    → repair sizing-input-build
thesis right, path  → entry/exit destroyed the return      → repair timing-posture-build
thesis right, wrong expression → instrument or hedge leaked risk → V0 scope limit, escalate
policy wrong        → the object was fine, the threshold was not → policy_defect
```

Emit: `compiled` | `attribution_ambiguous`.

`attribution_ambiguous` proceeds with competing hypotheses **preserved**. Never
collapse to a single cause to make the review read cleanly — a tidy postmortem
with a fabricated cause is worse than an honest ambiguous one, because it
triggers a confident repair of the wrong node.

### O3 `recompute.route` — filter

Route the **narrowest** justified rerun. Bounded by
the configured `POLICY.loop.max_rerun_depth`.

| Route | When |
| --- | --- |
| `rerun_evidence` | A source claim was wrong or its independence was overstated |
| `rerun_market_view` | The market's model was misread, or the residual was understated |
| `rerun_variant` | `V_V` or `G_M` failed |
| `rerun_recognition` | The mechanism failed, or `q_T` was miscalibrated |
| `rerun_sizing` | Distributions or haircuts were wrong |
| `rerun_timing` | Posture or contingent policy was wrong |
| `policy_defect` | The object satisfied the contract and the **threshold** was wrong |
| `no_change` | Process worked; outcome was variance. Next trigger required. |
| `postmortem_only` | Durable lesson, no node to repair |

Emit: `rerun_evidence` | `rerun_market_view` | `rerun_variant` | `rerun_recognition` | `rerun_sizing` | `rerun_timing` | `policy_defect` | `no_change` | `postmortem_only`.

`policy_defect` flags a rule or calibrated value that should be reconsidered
through a versioned policy review. It must not silently change an active policy.

`no_change` is legitimate and should be common. Most single outcomes are variance,
and repairing a process on one draw is overfitting.

## Output

`outcome_review` object → rerun route or journal. Feeds process-health accounting
(`POLICY.health`).

## Prohibited Decisions

- Rewriting, editing, or "clarifying" the original decision record.
- Inferring causality from P&L alone.
- Collapsing competing attribution hypotheses to make the narrative clean.
- Grading a decision by its outcome.
- Repairing more than one node from a single ambiguous review.

## Quality Checks

- Would this review have reached the same thesis assessment with the P&L hidden?
- Are competing attribution hypotheses genuinely competing, or one plus two
  strawmen?
- Does the repair question name exactly one node?
- Has any review ever concluded "profitable and badly decided"? If not, the skill
  is not working.
- Is the policy version compared the one in force at decision time?

## Common Failure Modes

- Outcome bias: P&L sign determines the verdict.
- Hindsight rewriting of what the thesis "really" was.
- Repairing the most recent node because it is the most visible.
- `no_change` used to avoid the work of attribution.
- Postmortems stored beside an unchanged process — a review with no route is not
  a review.
