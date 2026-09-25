"""Paper-run interfaces compiled from the provisional skills registry.

These are callable contracts, not implementations or approved trading logic.
The type-specific bodies are deliberately incomplete until schemas are frozen.
Node IDs and dispositions are defined by ROUTING.md; policy values live in
POLICY-V0.md. Implementations must validate envelopes and routes in code.
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Generic, Literal, Mapping, Protocol, TypeVar


Body = Mapping[str, object]  # Replace with versioned schemas, one per object type.
Primitive = Literal["filter", "compress", "hypothesize"]
ValidationStatus = Literal["valid", "degraded", "failed"]
T = TypeVar("T")


@dataclass(frozen=True)
class RunContext:
    run_id: str
    as_of_time: datetime
    policy_ref: str
    model_version: str | None
    prompt_version: str | None


@dataclass(frozen=True)
class ObjectRef:
    object_id: str
    version: int  # Serialized as ID@vNNN; never an unversioned reference.


@dataclass(frozen=True)
class StoredObject(Generic[T]):
    ref: ObjectRef
    object_type: str
    schema_version: str
    object_state: str
    as_of_time: datetime
    created_at: datetime
    producer: str
    run_id: str
    input_refs: tuple[ObjectRef, ...]
    policy_refs: tuple[str, ...]
    model_version: str | None
    prompt_version: str | None
    confidence: float
    uncertainty: str
    validation_status: ValidationStatus
    next_consumer: str
    residual_route: str | None
    prior_version_ref: ObjectRef | None
    body: T


@dataclass(frozen=True)
class NodeResult(Generic[T]):
    node_id: str
    primitive: Primitive
    disposition: str  # Must match this node's row in ROUTING.md.
    reason_code: str
    output: T | None
    next_review_trigger: datetime | None = None
    residual_route: str | None = None


class EvidenceNodes(Protocol):
    def e1_source_check(self, run: RunContext, source: Body, coverage_graph: Body) -> NodeResult[Body]: ...
    def e2_claim_ledger_compile(self, run: RunContext, source: Body) -> NodeResult[StoredObject[Body]]: ...
    def e3_lineage_time_route(self, run: RunContext, ledger: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...
    def e4_independence_route(self, run: RunContext, ledger: StoredObject[Body], thesis_index: Body) -> NodeResult[Body]: ...
    def e5_thesis_update_route(self, run: RunContext, ledger: StoredObject[Body], coverage_graph: Body, thesis_index: Body) -> NodeResult[tuple[StoredObject[Body], ...]]: ...


class MarketViewNodes(Protocol):
    def m1_snapshot_check(self, run: RunContext, asset_id: str, snapshot: StoredObject[Body] | None) -> NodeResult[StoredObject[Body] | None]: ...
    def m2_market_driver_map_compile(self, run: RunContext, asset_id: str, claims: StoredObject[Body], snapshot: StoredObject[Body] | None, prior_map: StoredObject[Body] | None) -> NodeResult[StoredObject[Body]]: ...
    def m3_market_map_check(self, run: RunContext, driver_map: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...


class VariantNodes(Protocol):
    def v1_persistence_propose(self, run: RunContext, driver_map: StoredObject[Body], claims: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...
    def v2_persistence_check(self, run: RunContext, candidate: StoredObject[Body], driver_map: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...
    def v3_variant_claim_compile(self, run: RunContext, driver_map: StoredObject[Body], claims: StoredObject[Body], admitted_mechanism: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...
    def v4_disconfirming_world_propose(self, run: RunContext, variant: StoredObject[Body], claims: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...
    def v5_disconfirming_world_check(self, run: RunContext, candidate: StoredObject[Body], variant: StoredObject[Body], claims: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...
    def v6_variant_claim_check(self, run: RunContext, variant: StoredObject[Body], counterworld: StoredObject[Body], driver_map: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...


class RecognitionNodes(Protocol):
    def r1_recognition_path_compile(self, run: RunContext, variant: StoredObject[Body], driver_map: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...
    def r2_recognition_path_check(self, run: RunContext, path: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...


class SizingNodes(Protocol):
    def s1_payoff_casebook_compile(self, run: RunContext, variant: StoredObject[Body], recognition_path: StoredObject[Body], scenario_result: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...
    def s2_sizing_input_compile(self, run: RunContext, casebook: StoredObject[Body], risk_liquidity: StoredObject[Body] | None, portfolio_state: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...
    def s3_sizing_input_check(self, run: RunContext, sizing_input: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...


class TimingNodes(Protocol):
    def t1_timing_posture_compile(self, run: RunContext, variant: StoredObject[Body], recognition_path: StoredObject[Body], sizing_input: StoredObject[Body], optimizer_result: StoredObject[Body], portfolio_state: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...
    def t2_action_admissibility_check(self, run: RunContext, posture: StoredObject[Body], hard_limits_result: StoredObject[Body], approver_id: str | None) -> NodeResult[StoredObject[Body]]: ...


class OutcomeNodes(Protocol):
    def o1_learning_check(self, run: RunContext, frozen_decision: StoredObject[Body] | None, realized_observations: StoredObject[Body]) -> NodeResult[Body]: ...
    def o2_outcome_attribution_compile(self, run: RunContext, frozen_decision: StoredObject[Body], realized_observations: StoredObject[Body]) -> NodeResult[StoredObject[Body]]: ...
    def o3_recompute_route(self, run: RunContext, review: StoredObject[Body], rerun_depth: int) -> NodeResult[StoredObject[Body]]: ...


class DeterministicServices(Protocol):
    def expectations_snapshot(self, run: RunContext, asset_id: str) -> StoredObject[Body]: ...
    def scenario_calculator(self, run: RunContext, variant: StoredObject[Body], path: StoredObject[Body]) -> StoredObject[Body]: ...
    def risk_and_liquidity(self, run: RunContext, asset_id: str, portfolio_state: StoredObject[Body]) -> StoredObject[Body]: ...
    def optimizer(self, run: RunContext, sizing_inputs: tuple[StoredObject[Body], ...], portfolio_state: StoredObject[Body]) -> StoredObject[Body]: ...
    def hard_limits(self, run: RunContext, optimizer_result: StoredObject[Body], portfolio_state: StoredObject[Body]) -> StoredObject[Body]: ...
    def paper_blotter(self, run: RunContext, human_approval_ref: ObjectRef, posture: StoredObject[Body]) -> StoredObject[Body]: ...


class ObjectStore(Protocol):
    def read(self, ref: ObjectRef) -> StoredObject[Body]: ...
    def append(self, obj: StoredObject[Body]) -> ObjectRef: ...
    def log_node(self, run: RunContext, result: NodeResult[object]) -> None: ...


class Validators(Protocol):
    def validate_envelope(self, run: RunContext, obj: StoredObject[Body]) -> None: ...
    def validate_lineage(self, run: RunContext, obj: StoredObject[Body], store: ObjectStore) -> None: ...
    def validate_transition(self, result: NodeResult[object]) -> None: ...
    def validate_no_weight_or_order(self, obj: StoredObject[Body]) -> None: ...
    def validate_candidate_quarantine(self, consumer_node: str, obj: StoredObject[Body]) -> None: ...
