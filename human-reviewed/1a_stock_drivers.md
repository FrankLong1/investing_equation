# 1A. Understand What Drives the Stock

[Core model v4](./hedge-fund-as-a-function-v4.md) ·
[Identify the Key Debates](./2a_identify-key-debates.md) ·
[Stock Return and Catalyst Taxonomy](./Other/stock-return-and-catalyst-taxonomy.md)

## Price inputs

$$
P_t
=
\operatorname{Price}
\left(F_t,\mathrm{Mult}_t,\mathrm{Tech}_t,\mathrm{Macro}_t\right).
$$

- **Fundamentals ($F_t$):** the expected path of business economics—revenue,
  earnings, cash flow, assets, or a probability-weighted payoff. The market
  often trades on forward operating indicators such as backlog, bookings,
  usage, or power capacity because they inform that path. Identify both the
  indicator receiving market attention and the assumptions connecting it to
  future financial outcomes.
- **Multiple ($\mathrm{Mult}_t$):** what investors will pay for the selected
  fundamental, based on growth, quality, durability, defensibility, capital
  intensity, cash conversion, and uncertainty. High but temporary or expensive
  growth can receive a low multiple.
- **Technicals ($\mathrm{Tech}_t$):** positioning, flows, float, borrow, options
  exposure, index activity, and forced transactions that determine who must
  trade against how much liquidity.
- **Macro ($\mathrm{Macro}_t$):** rates, inflation, growth, policy, FX,
  commodities, and the broader risk regime.

The compact valuation shorthand is:

$$
P_t \approx F_t \times \mathrm{Mult}_t.
$$

This shorthand does not mean the stock trades directly on EPS. Investors may
use an operating indicator as a proxy for future financial outcomes, or even
quote value per unit of that indicator. The conversion depends on demand,
pricing, execution, costs, and financing; it can change across regimes.

## 1. Fundamentals

Organize metrics into three buckets: reported financial metrics, disclosed
operating KPIs, and undisclosed but estimated metrics. These describe our
visibility into the economics; any bucket can contain an emerging or
underappreciated driver.

### Key Questions

#### Current Market Focus

- **Sellside:** What do sell-side analysts emphasize in reports, models, and earnings questions?
- **Management Guidance:** Which metrics does management guide to, and what numbers does the market expect?
- **Meeting Transcripts:** What topics and questions recur when we discuss the company?

#### 1. Reported Financial Metrics

- **Financial Metrics:** Which reported revenue, margin, earnings, cash-flow, or investment measures matter most, and what drives them?
- **Financial Sensitivity:** Which products, segments, costs, or constraints have the greatest financial sensitivity?

#### 2. Disclosed Operating KPIs

- **Current Indicator:** Which forward operating indicators does the stock trade on, and over what horizon?
- **Economic Link:** How do those indicators translate into revenue, margins, and ultimately earnings or cash flow? What assumptions make that translation credible?
- **Metric Definition:** What exactly is being measured—for example, announced, secured, energized, contracted, or revenue-producing capacity?

Illustrative ways this can work:

- **Equipment Backlog:** Backlog can signal future sales and earnings, conditional on delivery timing, cancellations, pricing, and margins. The size of the backlog alone does not establish its financial value.
- **Infrastructure Capacity:** Secured capacity can proxy for future revenue and earnings when investors expect it to be delivered, equipped, and leased at attractive prices. That inference depends on demand, utilization, costs, and financing; capacity alone does not establish rentable service capacity or shareholder value.

#### 3. Undisclosed but Estimated Metrics

- **Missing Metrics:** Which financial metrics or operating KPIs do we need to estimate for known business drivers?
- **Estimation:** What evidence and operating assumptions support the estimate?
- **Checks:** Does the estimate reconcile with reported totals, and how sensitive is it to uncertain inputs?

Keep estimated business economics separate from reported figures and from
what we think the market expects; the latter belongs in Step 2B.

#### 4. Emerging Drivers

- **Potential Drivers:** What new products, business lines, or changes in the business could become material?
- **Early Evidence:** What signs of adoption or commercial traction are visible?
- **Path to Materiality:** What would need to happen for this to meaningfully affect company earnings or cash flow?

## 2. Multiple

### Key Questions

#### Current Valuation Framework

- **Valuation Method:** Which financial measure or operating indicator anchors valuation, and what valuation method does the market use?
- **Embedded Assumptions:** What growth, quality, and durability assumptions underpin the current multiple?

#### Changes in the Pricing Regime

- **Previous and Current Anchor:** Was the stock previously valued mainly on A and now increasingly on B? A pricing-regime change is a shift in the metric, framework, or assumptions investors give the most weight to.
- **Changed Assumptions:** What changed in the link between the old indicator and future financial outcomes—for example, demand, scarcity, pricing, or execution confidence?
- **Evidence of the Shift:** Do valuation practice, investor commentary, and reactions to new information support a sustained change in emphasis?

For example, in a supply-constrained environment, an infrastructure provider
may trade mainly on secured capacity because investors expect that capacity to
find customers at attractive prices. If demand becomes less certain, emphasis
may shift toward contracted utilization, realized pricing, margins, or cash
generation. More capacity can then carry less value, or require investment
without adequate returns.

Map the current regime here; assess a potential future shift in Steps 2A–2C.

#### Comparable Companies

- **Peer Group:** Which companies does the market use as comps, and how comparable are their economics?
- **Relative Valuation:** What explains the stock's current premium or discount to those comps?

## 3. Technicals

### Key Questions

#### Investor Base and Positioning

- **Investor Base:** Who owns and trades the stock, and over what horizons?
- **Positioning:** How concentrated, crowded, or shorted is it, and what evidence supports that assessment?

#### Liquidity, Float, and Borrow

- **Float and Liquidity:** How much stock is available to trade, and how deep is the liquidity?
- **Borrow:** What are the current borrow availability, costs, and constraints?

## 4. Macro

### Key Questions

#### Relevant Macro Variables

- **Macro Exposures:** Which rates, growth, inflation, policy, FX, or commodity variables matter to this stock?

#### How They Affect the Stock

- **Transmission Channels:** Through which business, valuation, or trading channels do those variables reach price?
- **Sensitivity Evidence:** What evidence establishes the stock's sensitivity to them?

## How to identify current price drivers

A **price driver** is any variable whose change or surprise can materially
affect the stock through fundamentals, the multiple, technicals, or macro.

- **Build the causal bridge:** trace the operating indicator through the
  business into future earnings or free cash flow, making the conversion
  assumptions explicit.
  - **Example:** secured power → energized and equipped compute capacity →
    contracted and utilized capacity × realized pricing → revenue → operating
    costs, investment, and financing → earnings or cash flow.
- **Check the pricing regime:** identify which link investors currently focus
  on and whether the assumptions supporting that focus still hold. Estimate
  price sensitivity within the relevant regime rather than assuming a fixed
  relationship across regimes.
- **Measure covariance and price response:** test whether changes or surprises
  in the variable coincide with abnormal stock returns:

  $$
  \operatorname{Cov}
  \left(\operatorname{Surprise}(d_t),AR_t\right).
  $$

  - **Variables:** $d_t$ is the candidate driver; $AR_t$ is the stock's return
    after controlling for market and sector moves.
  - **Limitation:** covariance is noisy because of anticipation, omitted
    variables, simultaneous news, and regime changes.
- **See what people are saying:** track the numbers emphasized in company
  guidance, earnings questions, sell-side models and previews, estimate
  revisions, news coverage, and public or appropriately authorized investor
  commentary.
