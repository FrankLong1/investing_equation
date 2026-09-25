# Implementation boundary for V0

Status: scaffold for a paper decision only. Source of truth remains the
[human-reviewed overview](../human-reviewed/hedge-fund-as-a-function-v4.md),
[routing table](ROUTING.md), [object envelope](OBJECTS.md), and
[provisional policy](POLICY-V0.md). The callable interface is in
[`function_stubs.py`](function_stubs.py).

## What is specified enough to stub

- Seven skill groups contain 24 named nodes (E1–E5, M1–M3, V1–V6, R1–R2,
  S1–S3, T1–T2, O1–O3). Each has a launch point, a disposition set, and a
  route. The earlier count of 19 in this registry was incorrect.
- Six named numerical or data services, plus the object store and validators,
  have explicit interfaces. None has a working implementation yet.
- The envelope, point-in-time rule, candidate quarantine, no-weight rule,
  human gate, and explicit residual route can be enforced by code.

## What is still needed before an end-to-end run

1. Freeze versioned JSON schemas for each object body. `Body` in the stubs is
   intentionally broad; it does not prove that two nodes agree on fields,
   units, periods, or semantics. Start with source, claim ledger, expectations
   snapshot, market driver map, and disposition.
2. Make `ROUTING.md` machine-readable or compile it into a checked table.
   A `disposition: str` is not yet a type-safe transition. Define terminal
   triggers, repair budgets, and fan-out for E5 in that table.
3. Implement append-only storage, versioned reference resolution, run logs,
   timestamp checks, source-span checks, candidate quarantine, and the
   degraded-run terminal block before any LLM node runs.
4. Supply a measured expectations snapshot. The registry identifies this as
   missing; without it M1 marks the run degraded and the decision cannot
   reach the human review gate.
5. Specify numerical methods and input units for the scenario calculator,
   risk/liquidity service, optimizer, and hard limits. Policy thresholds alone
   do not define the calculations. Keep weight generation outside LLM nodes.
6. Create actual fixture packets and expected outputs. `fixtures/README.md`
   describes seven cases, but contains no fixture JSON files. Add a clean
   paper case plus the seven faults, then test both stop node and reason code.
7. Resolve the vocabulary mismatch explicitly: the human-reviewed overview
   uses Gather, Filter, Compress, Hypothesize; the provisional registry uses
   Filter, Refine, Hypothesize. The stubs label `refine` as `compress`, but the
   source gathering role and the boundaries of hypothesis generation need an
   explicit mapping before prompts are frozen.

## Smallest vertical slice

Build E1–E3, M1–M3, and the object-store validators around one public issuer
and a fixed as-of date. Use a filing, transcript, and measured price/consensus
snapshot. The first acceptance gate is replayable claim lineage and a market
map that either passes M3 or stops with `underdetermined_market_view`. Add
variant, recognition, sizing, and timing only after that gate is repeatable.

No stub authorizes a trade. The first complete output should be a versioned
paper decision packet for a human to review.
