---
name: market-view-reconstruction
description: Reconstruct what the market must believe for an asset's current price to make sense, as a driver-by-driver map with an explicit unexplained-price residual. Use before forming any variant view, and whenever expectations, price, or positioning move materially. Produces the baseline against which variantness and pricedness are judged. Does not form a view.
---

# Market View Reconstruction

Nodes M1–M3. Primitives: filter → refine → filter.
Routes: [`ROUTING.md` §2](../ROUTING.md). Constants: [`POLICY-V0.md` §2](../POLICY-V0.md).

## When To Use

- Before `variant-thesis-build` for any asset.
- When E5 routes `update_market_view` or `cross_check`.
- When price, consensus, or positioning moves enough that the prior map is stale.

## The Objection This Skill Is Built Around

This is the load-bearing object in the whole framework. `ΔF`, `ΔP`, "already
priced", `G_M`, and variantness are all defined relative to it. It is also the
easiest place to cheat: **if the same model produces both the market view and
the variant view, it can manufacture edge by understating consensus.** Nothing
detects that unless the reconstruction is checked against measurement.

Two defenses, both mandatory:

1. The map refines a **measured expectations snapshot**, not prose.
2. The map carries an `unexplained_price_residual`, which can fail.

The residual test makes this failure visible: a map that leaves too much of the
price unexplained must return `underdetermined_market_view`.

## Required Inputs

| Input | Required | Note |
| --- | --- | --- |
| Asset identifier and `as_of_time` | yes | |
| Accepted claims from `evidence-intake` | yes | `admitted` state only |
| Expectations snapshot | **yes for a valid run** | Consensus by line item, dispersion, revision trend, options-implied move, short interest, ownership deltas |
| Prior `market_driver_map` | no | Enables delta rather than rebuild |
| `policy@0.1.0` | yes | |

## Nodes

### M1 `snapshot.check` — filter

Is a current expectations snapshot available (`POLICY.market.require_measured_snapshot`)?

- Present and fresh → `snapshot_complete`, run is `valid`.
- Absent → `snapshot_missing`. The run proceeds on prose alone and is tagged
  `validation_status: degraded`. **A degraded map may never reach a terminal
  decision state** (Invariant 6). This is the honest state, not a blocker — but
  it must never be laundered into a normal run.
- Stale → `snapshot_stale`, route to the proposed
  `SVC:expectations-snapshot` service and re-enter once it supplies current
  data. The service is a contract, not an implementation in this registry.

Emit: `snapshot_complete` | `snapshot_missing` | `snapshot_stale`.

### M2 `market_driver_map.compile` — refine

For every material driver — volume, price, share, growth, margin, capital
intensity, discount rate, multiple — state:

| Field | Required entry |
| --- | --- |
| Driver | What affects value |
| Market view | What the market appears to believe causes it |
| Implied financial forecast | The number that follows, from the snapshot where measured |
| Evidence for the inference | Why we think this is *priced*, not merely believed |
| Price importance | Share of value this driver explains |
| Alternative interpretation | At least one competing reading (`POLICY.market.min_alternative_interpretations`) |
| Measurement basis | `measured` (from snapshot) or `inferred` (from prose) |

Then compute the residual: **what share of the current price or multiple is not
accounted for by the mapped drivers?**

The output is a market-driver map, not a list of consensus estimates. The
difference is causal: an estimate is a number, a driver map says what must be
true for that number to be the right one.

Emit: `compiled` | `insufficient_evidence`.

### M3 `market_map.check` — filter

Three tests:

1. `unexplained_price_residual ≤ POLICY.market.max_unexplained_price_residual`
2. Mapped drivers cover ≥ `POLICY.market.min_driver_importance_coverage` of price importance
3. At least `POLICY.market.min_alternative_interpretations` competing readings present

Emit: `map_admitted` | `underdetermined_market_view` | `single_story` | `repair`.

`underdetermined_market_view` is a **successful result**. It means the process does
not know what is priced — which is precisely the thing it must not guess at. A
variant view built on an unexplained price is a claim about a number nobody
understands.

## Output

`market_driver_map` object. `object_state: derived`. Required body fields:
`drivers[]`, `unexplained_price_residual`, `alternative_interpretations[]`,
`measurement_basis_mix`, `pricedness_confidence`.

## Prohibited Decisions

- Stating the portfolio view. This skill reconstructs the *market's* model only.
- Producing a target price or a valuation.
- Filling a driver's implied forecast by inference when the snapshot has it measured.
- Reporting a residual that was not computed.
- Adjusting the market view to make a later variant view look more variant.

## Quality Checks

- Can a skeptical reviewer state, from this map alone, what must be true for
  today's price to make sense?
- Is every `implied financial forecast` marked `measured` or `inferred`?
- Is the residual computed rather than asserted?
- Does at least one alternative interpretation genuinely compete, rather than
  restating the primary reading in softer language?
- If the same analyst later builds the variant view, would this map still look
  the same?

## Common Failure Modes

- Listing consensus estimates and calling it a driver map.
- Understating the market's sophistication so a variant view looks larger.
- A residual quietly omitted when it would have failed the gate.
- Alternative interpretations that are strawmen.
- Treating a degraded (snapshot-free) run as a normal one.
