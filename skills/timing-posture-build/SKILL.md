---
name: timing-posture-build
description: Decide whether a portfolio should carry risk before, through, or after the next evidence window — archetype, stage, remaining payoff, marginal price setter, exposure posture, and contingent actions — then check the proposal against hard limits and approval authority. Use after the optimizer produces a target. Never issues an order or approves an action.
---

# Timing Posture Build

Nodes T1–T2. Primitives: refine → filter.
Routes: [`ROUTING.md` §6](../ROUTING.md). Constants: [`POLICY-V0.md` §4, §7](../POLICY-V0.md).

## When To Use

- The optimizer produced a target that differs from the current position.
- An evidence window is opening on an existing position.
- Market state changed enough that the current posture is stale.

## Scope Boundary

**Investment timing** decides when a portfolio should carry risk exposure.
**Execution timing** decides how an approved change is traded.
This skill does the first only. Execution cannot repair a weak investment-timing
decision, and this skill cannot repair a weak thesis.

It also does not invent a recognition mechanism. `recognition-path-build` already
produced one; timing *consumes* that record. A second, freshly-invented catalyst
appearing at this node means the first one was not believed.

## Required Inputs

| Input | Required |
| --- | --- |
| Optimizer target proposal | yes |
| Hard-limit engine result | yes |
| Current position and pending orders | yes |
| `variant_claim` + `recognition_path` | yes |
| Market state: price path, valuation, estimates, positioning, flows, vol, liquidity, borrow | yes |
| Approval policy | yes |

## Nodes

### T1 `timing_posture.compile` — refine

**Step 1 — Classify the archetype.** The same entry rule must not govern all of these.

| Archetype | Belief | Posture |
| --- | --- | --- |
| Early inflection | Change beginning, weakly visible, disputed | Enter selectively, size cautiously, require early evidence and a clear invalidation condition |
| Confirming secular tailwind | Trend visibly working; duration, magnitude, breadth, or capture underappreciated | Enter or add on confirmation while remaining payoff exceeds trend and valuation risk |
| Discrete catalyst / event | A defined window can resolve the disagreement | Decide explicitly whether to own risk before the event or prefer post-event confirmation |
| Dislocation / panic | Forced selling has disconnected price from plausible value | Survival, liquidity, capital structure, and the gap-closing mechanism first |
| Mature or crowded | Increasingly recognized; marginal surprise diminished | Raise the hurdle for new risk; trim or hedge as fragility rises |
| Broken | Central claim, payoff map, or recognition path has failed | Exit, pause, or reverse — **do not relabel invalidation as a timing problem** |

**Step 2 — Assess remaining payoff.** The question is never "has the security
gone up?" It is: *has the price move exceeded, matched, or lagged the change in
likely economic outcomes and market expectations?* Decisions are made against the
**remaining** payoff, not the return already earned by others.

**Step 3 — State the marginal price setter hypothesis.** Not a person — the
*type* of participant most likely to set the next meaningful price, what changes
their behaviour, whether they act before or after the next window, and the
observable proxies that would show it. It must be falsifiable. A correct thesis
with no credible route to a marginal buyer is a correct but poorly timed
investment.

**Step 4 — Apply the confirmation table.**

| State | Default |
| --- | --- |
| Evidence strengthens; remaining payoff attractive | Initiate or add, subject to sizing and constraints |
| Evidence strengthens; price has caught up | Hold or wait — do not add because the trend is popular |
| Evidence unchanged; price falls without thesis impairment | Re-underwrite; add only if the payoff map improves and risk permits |
| Evidence weakens or the thesis is now priced | Trim, pause, hedge, or exit |

**Step 5 — Emit the posture and the contingent policy.**

```yaml
timing_decision:
  thesis_path_archetype:
  current_stage: early | confirming | mature | broken
  decision: initiate | add | hold | trim | exit | pause | hedge | no_action
  next_evidence_window:
  remaining_payoff_assessment:
  price_vs_evidence_assessment:
  marginal_price_setter_hypothesis:
  why_entry_or_change_now:
  evidence_that_would_justify_waiting:
  risk_if_wrong:
  action_if_confirmed:
  action_if_disconfirmed:
  next_review_trigger:
```

Emit: `compiled` | `no_timing_edge`.

`no_timing_edge` is a valid, recorded output carrying posture `wait` — not a
failure to produce one. Saying "the thesis is sound and owning it today is
inferior to waiting for X" is a decision.

### T2 `action_admissibility.check` — filter

Not an investment judgment. A controls check.

| Test | Failure |
| --- | --- |
| Hard-limit engine passed | `blocked` |
| Audit packet complete: thesis, recognition, sizing input, optimizer output, posture all present and versioned | `repair` |
| Object is not `validation_status: degraded` (Invariant 6) | `blocked` |
| Required approver identified | `escalate` |
| Every no-action carries a next review trigger | `repair` |

Emit: `approved_for_human_review` | `no_action` | `wait_for_trigger` | `blocked` |
`escalate` | `repair`.

**The model never authorizes.** `approved_for_human_review` means the packet is
complete enough to put in front of a person. Authority cannot be inferred from
the quality of the model's own output.

"Wait for a better entry" without a reason and a resolving condition returns
`repair`, every time.

## Output

`timing_posture` object + `disposition`. On approval → human gate → `SVC:blotter`.

## Prohibited Decisions

- Issuing an order, order schedule, or execution instruction.
- Overriding the optimizer target.
- Waiving a hard limit or granting an exception.
- Approving its own proposal.
- Inventing a recognition mechanism not in the `recognition_path` record.
- Relabelling a broken thesis as a timing problem.

## Quality Checks

- Can a reviewer distinguish "correct thesis, wait" from "correct thesis, own
  partial exposure", and test the stated trigger?
- Is the marginal price setter hypothesis falsifiable with named proxies?
- Is the decision made against remaining payoff, or anchored to the entry price?
- Does every no-action name a condition that would resolve it?
- Is momentum being used as admissible evidence, or as the thesis?

## Common Failure Modes

- Treating a rise as a reason to trim and a fall as a reason to add, with no
  reference to evidence.
- A broken thesis held as "early".
- Marginal-buyer stories with no observable proxy.
- Staging chosen for comfort rather than for event risk, liquidity, or constraints.
- Execution detail leaking into an investment-timing record.
