# Object Store And Envelope

Status: provisional
Version: `objects@0.1.0`

## Why This File Exists

Every function contract in the corpus ends with `next_consumer:` or "pass to X",
but the contracts do not define where the object between them lives. The
workflow needs an accepted-claim store before a node can read accepted claims.

The proposed store is file-backed: a directory can be diffed, reviewed, and
committed, with `git log` as an audit trail.

## Store Layout

```text
skills/state/                         # proposed location; not implemented
  runs/
    RUN-2026-08-01-001/
      manifest.json            # as_of_time, policy version, fixture ref, model versions
      log.jsonl                # one line per node execution: node, disposition, reason, duration
  objects/
    claim_ledger/CLM-0001/v001.json
    market_driver_map/MDM-ASSET-0001/v001.json
    candidate_hypothesis/HYP-0007/v001.json
    variant_claim/VAR-ASSET-0001/v002.json
    recognition_path/RCG-ASSET-0001/v001.json
    sizing_input/SZI-ASSET-0001/v001.json
    timing_posture/TMG-ASSET-0001/v001.json
    outcome_review/OCR-0003/v001.json
    disposition/DSP-0044/v001.json
  queues/
    repair/                    # symlinks or ID lists awaiting repair, with attempt count
    escalation/                # exhausted budget or policy exception — human owns these
    residual/                  # material but unrouted; the anti-silent-drop queue
    representation_gap/        # evidence with no covered asset to attach to
  coverage/
    graph.json                 # covered assets, entity edges, last-routed timestamp
    debt.json                  # derived: assets exceeding health.max_coverage_debt_days
```

## ID Scheme

`<TYPE>-<SCOPE>-<SEQ>` where scope is an asset identifier when the object is
asset-bound and omitted when it is not. `ASSET` below is a placeholder.

```text
CLM-0001              claim ledger, not asset-bound
MDM-ASSET-0001        market driver map for a placeholder asset
VAR-ASSET-0002        second variant claim for that placeholder asset
HYP-0007              candidate hypothesis, pre-admission, deliberately not asset-scoped
```

Versions are files, not fields: `v001.json`, `v002.json`. Objects are
**append-only**. A revision writes a new version referencing the prior one. No
version is ever edited in place — that is what makes replay possible and what
prevents retrospective rewriting of a decision.

## The Envelope

Proposed shared contract: every object of every type carries these fields at its
top level. The type-specific payload sits under `body`. The following record is
synthetic and illustrates the shape only.

```json
{
  "object_id": "VAR-ASSET-0002",
  "object_type": "variant_claim",
  "schema_version": "variant_claim@0.1.0",
  "object_state": "admitted",
  "as_of_time": "2026-08-01T00:00:00Z",
  "created_at": "2026-08-01T14:22:11Z",
  "producer": "variant-thesis-build/N3",
  "run_id": "RUN-2026-08-01-001",
  "input_refs": ["MDM-ASSET-0001@v001", "CLM-0001@v003"],
  "policy_refs": ["policy@0.1.0"],
  "model_version": "example-model-v1",
  "prompt_version": "variant-thesis-build@0.1.0",
  "confidence": 0.55,
  "uncertainty": "synthetic disagreement about the example driver",
  "validation_status": "valid",
  "next_consumer": "recognition-path-build",
  "residual_route": null,
  "prior_version_ref": "VAR-ASSET-0002@v001",
  "body": {}
}
```

### Field rules

| Field | Rule |
| --- | --- |
| `object_state` | One of `candidate_only`, `admitted`, `derived`, `disposition`, `quarantined`, `superseded`. A `candidate_only` object may never be read by a refine step or a numerical service. The proposed validator must enforce this quarantine structurally. |
| `as_of_time` | The run's anchor. Any input whose `available_time` exceeds it voids the object. Never inherited loosely — it is copied from the run manifest. |
| `input_refs` | Versioned refs, always `ID@vNNN`. An unversioned ref is invalid. |
| `validation_status` | `valid`, `degraded`, `failed`. `degraded` is the honest state for a run missing a required deterministic input (e.g. no expectations snapshot — see `POLICY.market.require_measured_snapshot`). A degraded object may proceed but may never reach a terminal decision state. |
| `next_consumer` | Must resolve to a skill name in [`ROUTING.md`](./ROUTING.md) or a queue directory. Free text is invalid. |
| `residual_route` | Non-null whenever material content was *not* carried forward. The anti-silent-drop field. |
| `confidence` | Number in `[0,1]`. Not an adjective. "High conviction" is not a value. |

## Claim References

Material claims cite a span, not a document
(`POLICY.evidence.require_source_span`):

This example is synthetic; it is not an issuer statement or research evidence.

```json
{
  "claim_id": "CLM-0001.c14",
  "text": "example metric rose from 58.8 to 61.2 units",
  "epistemic_type": "fact_claim",
  "source_ref": "SRC-0003",
  "span": {"locator": "example page 1", "quote": "Example metric: 61.2 units (prior: 58.8 units)"},
  "event_time": "2026-07-22T00:00:00Z",
  "available_time": "2026-07-22T21:05:00Z",
  "derives_from": []
}
```

`derives_from` is what makes the independence test
(`POLICY.evidence.independence_min_primary_sources`) computable rather than
judgemental. Four outlets echoing one filing produce four claims whose
`derives_from` all point at the same `SRC`; the proposed deterministic validator
would count one primary source, not four.

## Deterministic Validators

These are proposed code checks to implement before any model sees an object.
They should not be delegated to a prompt, because a model asked to check its
own lineage can report success without enforcing the contract.

| Validator | Checks |
| --- | --- |
| `envelope_complete` | All required envelope fields present and correctly typed. |
| `refs_resolve` | Every `input_refs` entry exists at the named version. |
| `no_leakage` | No transitively referenced claim has `available_time > as_of_time`. |
| `span_present` | Every material claim has a non-empty `span.quote`. |
| `independence_count` | Material claims meet the primary-source minimum via `derives_from` closure. |
| `quarantine_respected` | No `derived` or `admitted` object lists a `candidate_only` object in `input_refs`. |
| `state_transition_legal` | The transition is permitted by [`ROUTING.md`](./ROUTING.md). |
| `no_weight_emitted` | No LLM-produced object contains a portfolio weight field (`POLICY.expression.llm_may_emit_weight`). |

An implementation should fail any object that does not pass `envelope_complete`
and `refs_resolve`, regardless of how good its reasoning was.

## What Is Deliberately Not Here

No schema registry, migration tooling, database, or object-store implementation
is provided here. The proposed V0 stores JSON in directories and validates it
with code. If the seven planned fixtures pass and the store becomes a bottleneck,
that would be a reason to revisit this design.
