# Adversarial Fixtures

Status: provisional
Version: `fixtures@0.1.0`

## Why These Cases Need Files

The seven cases below specify failures and abstentions the proposed workflow
should handle. Fixture JSON files and a runner have not been implemented. This
list is a construction plan, not a test result.

Each planned fixture names **the node that should stop it and the reason code it
should emit**. Once implemented, a case that stops at the right node for the
wrong reason should fail: failures need to be attributable.

## Construction

One public issuer. A fixed `as_of_time`. One quarterly filing, one earnings
transcript, one timestamped price/consensus snapshot, two public sources
containing a deliberate factual conflict. Faults are injected into copies of that
base packet.

Planned layout: `fixtures/F-0N-<slug>/` containing `manifest.json` (run anchor
and a synthetic test-policy instance with explicit threshold values), `sources/`,
and `expected.json`. The test-policy values are fixture inputs, not portfolio
defaults.

## The Seven

| # | Fixture | Injected fault | Must stop at | Reason code |
| --- | --- | --- | --- | --- |
| F-01 | `circular-evidence` | Four outlets restate one filing line; the claim exceeds the test policy's materiality threshold | **E4** | `circular` → demotion; then **V6** `insufficient_evidence` |
| F-02 | `after-cutoff-fact` | One claim with `available_time` one hour after `as_of_time` | **E3** | `leakage_detected` — whole ledger quarantines |
| F-03 | `unexplained-residual` | The unexplained share of the current multiple exceeds the test policy's residual limit | **M3** | `underdetermined_market_view` |
| F-04 | `inattentive-market` | `G_M` reads "the market is not paying attention to this segment" | **V2** | `g_m_not_a_mechanism` |
| F-05 | `negating-counterworld` | Counterworld asserts "the margin expansion does not persist" without changing any mechanism | **V5** | `does_not_change_central_claim` |
| F-06 | `calendar-catalyst` | Recognition path names "Q3 earnings, October" with no disputed fact attached | **R2** | `no_observable_revelation` |
| F-07 | `clean-research-only` | **No fault.** A sound variant view whose `q_T` is below the test policy's recognition floor | **R2** | `q_T_below_floor` → `research_only` |

## What Each Fixture Is Really Testing

**F-01** — that independence is computed from the `derives_from` closure rather
than from document count, and that a demoted claim actually propagates to a
downstream abstention instead of being quietly forgotten.

**F-02** — that leakage voids rather than haircuts, and that it quarantines the
*whole ledger*. A ledger containing one leaked claim cannot be trusted to have
caught the others.

**F-03** — that `unexplained_price_residual` is computed and can fail. This is the
only structural defense against a model that reconstructs whatever market view
makes its own variant view look largest.

**F-04** — that the six permitted `G_M` mechanism types actually bind, in every
paraphrase. This one should be re-run with several wordings of the same
non-mechanism.

**F-05** — that a counterworld must change the mechanism, not the conclusion. The
most common real failure, because negating the conclusion always sounds like a
countercase.

**F-06** — the paper's earnings rule, made enforceable. A date on which
information arrives is not a mechanism that closes `G_M`.

**F-07** — the most important one. **A clean case with no injected fault that must
still abstain.** If the system only stops on faults, it has learned to detect
tampering rather than to apply thresholds. F-07 is also the falsification test
for the proposed workflow: if it produces a replayable terminal state with full
lineage, the policy constants and object store are exercising their intended
roles.

## Required Behaviours Across All Fixtures

1. Every material claim carries a source span or an explicit `inference` /
   `forecast` / `unknown` label.
2. The injected conflict in the base packet stays visible and unresolved in every
   run — it is never averaged away.
3. No fixture produces a portfolio weight, an order, or an external
   recommendation.
4. Every terminal state carries a reason code and a next review trigger.
5. A second benign re-run produces materially equivalent structured objects.
6. No fault leaks past its expected stop node into financial modeling.

## Additional Cases Worth Adding

Additional minimum coverage to build:

- one missing-input abstention per node;
- one `repair`-budget exhaustion, verifying it routes to escalation and **never**
  to `reject`;
- one tempting-but-prohibited downstream decision (a sizing input that a model
  would want to convert into a weight — should hard-fail `weight_emitted`);
- one degraded run (no expectations snapshot) verifying it cannot reach
  `approved_for_human_review`;
- one abstention-band breach, verifying the process alarm fires.

## Proposed Pass Condition

With the synthetic test policy supplied, the workflow would pass when each fault
stops at its expected node with its expected reason code and repair route, F-07
terminates cleanly at `research_only`, and no fault reaches the scenario
calculator.

A run in which every fixture terminates but the reason codes are wrong is a
**worse** outcome than one that crashes — it means the gates are firing on
plausibility rather than on policy.
