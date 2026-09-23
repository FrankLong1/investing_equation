# Stock Return And Catalyst Taxonomy

[Operating-loop overview](../hedge-fund-as-a-function-v4.md) ·
[Understand What Drives the Stock](../0_stock_drivers.md) ·
[Form a Variant View](../2c_form-a-variant-view.md) ·
[Timing](../4c_timing.md)

## Core idea

A stock goes up when the market raises the value of the future cash flows and
claims attributable to each share, lowers the return required to own those
claims, or when buying pressure temporarily outruns available supply. It goes
down through the mirror image.

For a simple earnings-multiple representation:

$$
P_t = F_t \times M_t,
$$

where $F_t$ is the market's chosen forward fundamental metric per share and
$M_t$ is the multiple applied to it. Therefore:

$$
\frac{P_1}{P_0}
=
\frac{F_1}{F_0}
\times
\frac{M_1}{M_0}.
$$

This is an attribution identity, not a complete valuation model. $F$ may be
next-twelve-month EPS, out-year EPS, free cash flow per share, NAV, or a
probability-weighted payoff. $M$ compresses discount rates, duration,
quality, risk, and the valuation convention used by marginal investors.

For underwriting, use the fuller bridge:

```text
realized shareholder return
= change in the forward fundamental path per share
+ change in valuation / required return
+ cash and other value distributed to shareholders
+ change in security rights or share count
+ temporary or persistent market-mechanics effects
+ interaction terms
```

In multiplicative form, the interaction is real. If forward EPS rises 20% and
the P/E rises from 20x to 25x, price rises $1.20 \times 1.25 - 1 = 50\%$, not
45%.

## 1. The ways stocks go up or down

### 1.1 Forward fundamental-path change

The market revises the amount, timing, persistence, or probability of future
cash flows attributable to each share.

| Up | Down |
| --- | --- |
| Higher unit demand, volume, price, or market share | Lower demand, lost share, price pressure, or churn |
| Better mix, gross margin, operating leverage, or cost structure | Mix deterioration, margin compression, or diseconomies |
| Lower capex or working-capital needs; higher cash conversion | Higher capital intensity, working-capital use, or weak cash conversion |
| Higher state probability: approval, launch, survival, successful transition | Lower approval, launch, survival, or transition probability |
| Greater persistence or a longer competitive-advantage period | Pull-forward, saturation, mean reversion, or shorter duration |
| Accretive buybacks or capital allocation raise value per share | Dilution, SBC, bad M&A, or value-destructive capital allocation lowers value per share |

This is the broad meaning of a **forward revision**. It is not limited to the
next consensus EPS number. A revision can affect the whole revenue and margin
curve, terminal economics, the probability distribution across scenarios, or
the number of shares over which value is divided.

Three distinctions matter:

1. **Level versus revision.** High growth is not bullish if the market already
   expected higher growth. Price responds to the change relative to the prior.
2. **Reported versus forward.** A backward-looking beat matters only to the
   extent it changes beliefs about the future generating process.
3. **Near-term versus duration.** A one-quarter EPS increase may be worth less
   than evidence that a smaller improvement persists for five years.

### 1.2 Valuation or required-return change

The expected cash-flow path can remain unchanged while investors change the
price they will pay for it.

| Multiple expansion / lower required return | Multiple compression / higher required return |
| --- | --- |
| Lower risk-free rates or equity risk premium | Higher rates or equity risk premium |
| Lower company-specific uncertainty | Higher uncertainty, leverage, cyclicality, or governance risk |
| Greater confidence in durability, quality, or terminal value | Shorter perceived duration or weaker terminal economics |
| Reclassification into a higher-quality or scarcer peer group | De-rating into a lower-quality, ex-growth, or impaired peer group |
| Improved liquidity, investability, or shareholder base | Liquidity deterioration, forced selling risk, or ownership overhang |
| Reduced left-tail probability | Newly visible tail risk or a wider outcome distribution |

“Narrative” belongs here only after translation. A new story can lower the
perceived required return, lengthen the perceived duration, change the peer
set, or attract a different marginal investor. The word alone is not a causal
explanation.

### 1.3 Distributions, claims, and capital structure

Shareholder return is not identical to price return. Dividends, special
distributions, spin-offs, tender offers, and acquisition consideration can
transfer value to holders even when the quoted price falls mechanically.
Conversely, dilution, new senior claims, expensive refinancing, or a coercive
restructuring can reduce the value of the existing equity claim.

Buybacks sit in two places: the cash outlay changes enterprise-to-equity value,
while the lower share count can increase value per remaining share. Whether a
buyback is accretive depends on price paid, funding, foregone uses of cash, and
the business's subsequent value—not on the EPS arithmetic alone.

### 1.4 Security supply, demand, and market mechanics

Price can move without a contemporaneous change in enterprise fundamentals:

- index inclusion or deletion and benchmark rebalancing;
- fund inflows or redemptions, forced deleveraging, margin calls, or liquidation;
- short covering, borrow recalls, or a change in lendable supply;
- option-dealer hedging and volatility-control or risk-parity rebalancing;
- block trades, lockup expirations, issuance, float changes, and liquidity gaps;
- crowding changes or a new marginal buyer or seller.

These effects can reverse, persist, or become reflexive. A higher stock price
can lower financing costs, support acquisitions, improve employee retention,
or prevent distress, thereby changing future fundamentals. The framework must
not label every flow-driven move “noise,” but it also must not retrofit a
fundamental story onto a mechanical move.

### 1.5 Time, carry, and convergence

A stock can appreciate with no new revision because an already-expected
fundamental path is being realized. Examples include earnings growth under a
constant multiple, a discount to a known cash payment closing as the payment
date approaches, or uncertainty resolving without changing the mean payoff.

This is why “the stock rose” does not prove that estimates were revised upward.
Attribution must separate:

- a change in expectations;
- delivery of the expectations already embedded in price;
- a change in the valuation applied to those expectations; and
- market mechanics.

## 2. What counts as a forward revision

### Direct forward revisions

- management raises or cuts revenue, margin, EPS, FCF, capex, or KPI guidance;
- analysts change estimates after new evidence;
- company-provided backlog, bookings, pricing, capacity, or pipeline changes;
- a probability-weighted milestone changes expected launch, approval, default,
  recovery, or commercialization value.

### Evidence that looks like, leads, or forces a forward revision

- a reported-quarter result reveals a different run rate or earning process;
- customer, supplier, competitor, channel, or geographic read-through;
- market-share, traffic, usage, retention, pricing, inventory, or lead-time data;
- hiring, capex, capacity, or procurement behavior that reveals management's
  private demand expectation;
- a product-quality, cost-curve, or technical benchmark that changes future
  adoption or unit economics;
- regulation, tax, tariffs, litigation, reimbursement, or policy that changes
  the future profit pool;
- financing availability or cost that changes survival, dilution, or growth
  capacity;
- repeated evidence that changes the perceived persistence of a trend even
  before published consensus moves.

The research edge is often to forecast the **revision before it appears in
consensus**. The causal unit is:

```text
new evidence
-> disputed operating or state assumption changes
-> forward financial distribution changes
-> published estimates may follow
-> marginal investors trade
-> price changes
```

Published sell-side estimate changes are therefore sometimes the catalyst,
sometimes confirmation, and sometimes a lagging measurement of a catalyst that
the market already processed.

## 3. Catalyst taxonomy: source versus transmission

A catalyst should be classified on two axes. The **source class** says where
the evidence or constraint came from. The **transmission channel** says which
price input it changes. Do not substitute one for the other.

| Source class | Examples | Likely transmission channels |
| --- | --- | --- |
| Earnings and guidance | Results, outlook, segment disclosure | Forward path, state probability, valuation |
| Operating KPI and alternative data | Usage, traffic, bookings, pricing, churn | Forward path, persistence |
| Product and competitive | Launch, benchmark, win/loss, substitution | Forward path, state probability, duration |
| Customer/supplier/peer read-through | Orders, inventory, capacity, pricing | Forward path, diffusion across a value chain |
| Capital allocation and corporate action | Buyback, dividend, M&A, spin, asset sale | Per-share claims, forward path, valuation |
| Financing and capital structure | Refinancing, issuance, downgrade, covenant | Survival, dilution, discount rate, security rights |
| Management and governance | CEO change, incentives, controls, activism | Forward path, risk premium, capital allocation |
| Legal, policy, and regulatory | Approval, ruling, tax, tariff, reimbursement | State probability, forward path, risk premium |
| Macro and regime | Rates, FX, commodities, inflation, demand | Forward path, discount rate, factor exposure |
| Positioning, flow, and technical | Index event, squeeze, forced selling | Security supply/demand; sometimes reflexive fundamentals |
| Gradual recognition | Revision waves, repeated KPI proof, thesis diffusion | Any channel, but spread across time |

The sign is always two-sided. The same source can cause an upward forward
revision, a downward revision, multiple expansion, multiple compression, or a
mixed result. A company can miss current EPS yet rise because guidance and
long-duration economics improve; it can beat and fall because the beat was
low quality, the forward guide fell, or the required multiple compressed.

## 4. Required return bridge in every thesis

Every candidate thesis should attribute its conditional return by channel:

```yaml
return_bridge:
  as_of:
  horizon:
  starting_price:
  valuation_metric:

  forward_fundamental:
    market_prior:
    example_case:
    change_pct:
    driver_contributions: []

  valuation:
    market_prior_multiple_or_required_return:
    example_case_multiple_or_required_return:
    change_pct:
    reasons: []

  distributions_and_claims:
    dividends_or_distributions:
    buyback_or_dilution_effect:
    capital_structure_effect:

  market_mechanics:
    expected_effect:
    persistence: transient | persistent | reflexive | unknown

  interaction_effect:
  implied_value:
  implied_total_return:
  downside_case:
  attribution_confidence:
```

Every catalyst hypothesis should then name:

1. the point-in-time market prior;
2. the new evidence relative to that prior;
3. the assumption or barrier it changes;
4. the transmission channel in the return bridge;
5. the expected sign, magnitude, speed, and persistence;
6. the marginal investor expected to revise or trade; and
7. what observation would show that the catalyst occurred but did not transmit.

This makes “forward revisions” operational. The thesis is not merely “numbers
go up.” It specifies which numbers, relative to what prior, because of what
evidence, with what duration, how much value sensitivity, and whether the
expected return also requires a favorable multiple change.

## 5. Diagnostic questions

- Is the thesis underwriting a business outcome, an expectations change, or
  both?
- Which part of expected return comes from fundamental revisions and which
  part requires multiple change?
- Is the multiple assumption independent, or is it a second expression of the
  same durability evidence already counted in the forward model?
- Does the catalyst create new information, or merely announce a date?
- Is consensus the relevant prior, or are whisper expectations, valuation,
  options, and positioning more informative?
- Is a price move fundamental, mechanical, or reflexive, and what evidence
  would distinguish them?
- Could the thesis be right about the business but wrong about the stock
  because the result was already priced, the multiple compressed, dilution
  intervened, or recognition took too long?
- Could the stock rise despite a fundamental miss because the forward
  distribution, discount rate, or positioning improved more?
