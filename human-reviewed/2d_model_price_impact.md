# 2D. Model Price Impact

[Core model v4](./hedge-fund-as-a-function-v4.md) ·
[Form a Variant View](./2c_form-a-variant-view.md) ·
[Calculate Expected Returns](./2e_calculate_expected_returns.md) ·
[Understand Market Pricing](./2b_understand-market-pricing.md) ·
[Stock Drivers](./0_stock_drivers.md)

## Purpose

Translate the variant view from 2C into a conditional stock price:
core driver → financial impact → valuation metric → multiple or other
valuation framework → value per share.

## 1. Isolate the Core Variant Driver

- **Core Driver:** What primary driver anchors the thesis? Identify any secondary driver separately; downstream consequences are part of the same causal chain.
- **Market vs. Variant:** What does the market assume in 2B, what do we assume instead, and over what period?
- **Common Basis:** Use consistent metric definitions, forecast periods, and valuation dates. Make assumptions held constant explicit.

## 2. Model the Financial Impact

- **Financial Bridge:** How much does the driver change, and how does that flow through revenue, costs, margins, and investment into the metric used for valuation—such as EPS, AFFO per share, EBITDA, or revenue?
- **Offsets and Interactions:** What cannibalization, competitive responses, bottlenecks, or linked changes alter the result? Avoid counting the same benefit twice.
- **Delta Table:** Show the market case, variant case, difference, and supporting assumption for each material metric and period.

## 3. Determine the Multiple or Valuation Framework

- **Baseline Valuation:** What multiple or other valuation framework is appropriate? First isolate the financial impact at an unchanged multiple or other valuation assumptions.
- **Valuation Change:** Does the thesis also change growth, durability, capital intensity, or risk enough to justify a different multiple or framework? Show that effect separately.

## 4. Calculate the Price Impact

- **Equity Bridge:** Where valuing the enterprise, account consistently for debt, cash, other claims, and diluted shares to reach value per share in each case.
- **Price Reconciliation:** How does the market case compare with today's stock price? Explain any gap rather than attributing it to our variant view.
- **Price Impact:** Report both the difference between the modeled variant and market prices and the variant price's upside or downside versus today's price.
- **Sensitivities:** What price range follows from reasonable uncertainty in the key operating and valuation assumptions?

## Output

- **Assumption Bridge:** Market belief → our belief → changes in operating and financial metrics.
- **Valuation Bridge:** Changed metrics and valuation assumptions → conditional value per share.
- **Result:** Market-case price, variant-case price or range, the difference, upside or downside versus today's price, and the valuation date or horizon.
- **Key Dependencies:** Which assumptions explain most of the price impact, and which remain uncertain?

The result is conditional on the variant assumptions and valuation framework.
Whether and when investors recognize the view is a separate question from
what the modeled business would be worth under those assumptions. Use an
explicit spreadsheet or calculation model for the arithmetic.

## Handoff to 2E

Pass the conditional price model and its assumptions to
[2E](./2e_calculate_expected_returns.md). Use the model across the range of
outcomes; 2E assigns probabilities and accounts for recognition by the chosen
horizon to build the return distribution.
