# 2C. Form a Variant View

[Core model v4](./hedge-fund-as-a-function-v4.md) ·
[Identify the Key Debates](./2a_identify-key-debates.md) ·
[Understand Market Pricing](./2b_understand-market-pricing.md) ·
[Model Price Impact](./2d_model_price_impact.md) ·
[Stock Drivers](./1a_stock_drivers.md)

## Purpose

Form a clear, evidence-backed variant view on a key debate or stock driver.
Start from the debates in [2A](./2a_identify-key-debates.md) and the market's
qualitative view and numerical assumptions in [2B](./2b_understand-market-pricing.md).
Identify what the market may be missing or misjudging, then map and test the
implications. Finding no defensible disagreement is a valid result.

## 1. Generate Candidate Disagreements

- **The Market Is Missing Something**

  Hypothetical examples for a computing-hardware supplier, not claims about any
  company's historical consensus:

  - **Omitted Driver:** What material driver is absent from the market's analysis?
    - **Example:** “Investors focus on the current customer base; demand from a new application could become material.”
  - **Omitted Debate:** What important question is not being asked about a known driver?
    - **Example:** “Investors see demand from a new application, but aren't asking whether alternative architectures could replace the current product.”
  - **Omitted Perspective:** What plausible answer is missing from an existing debate?
    - **Example:** “Investors debate product performance, but the supplier's software ecosystem could matter more to customer choice.”

- **The Market Recognizes Something but Misjudges It**

  - **Magnitude:** Is the market overestimating or underestimating its size or impact?
  - **Timing:** Could it happen earlier or later than expected?
  - **Duration:** Could it persist longer or reverse sooner than expected?
  - **Probability:** Is it more or less likely than the market assumes?
  - **Economics:** Is the market translating the driver into revenue, profit, cash flow, or value per share incorrectly?
  - **Interactions and Causality:** Could the same evidence support a different explanation, direction of effect, or interaction with other drivers?

**Valuation Framework:** Is the market misjudging how any of these drivers
translate into financial value or an appropriate valuation multiple?

These buckets can overlap across cohorts: a driver may be absent from one
group's models and misjudged in another's. Identify what is missing or
misjudged and the specific assumption that would change.

## 2. Map the Implications for Key Debates and Stock Drivers

- **Exact Disagreement:** What does the market appear to believe, and what do we believe instead?
- **Affected Debates:** If our belief is true, which debates change, and which perspective does it support?
- **Affected Drivers:** Which operating or financial drivers change, in what direction, and over what horizon?
- **Causal Link:** Why do those changes follow, and what intermediate assumptions must hold?
- **New Debate or Driver:** Does the view reveal something material missing from the existing map?

## 3. Test the Disagreement

- **Supporting Evidence:** What observations favor our interpretation over the market's?
- **Strongest Counterargument:** What would someone who understands the business well say against us?
- **Already Understood:** Could investors already know this and reasonably assign it little value?

### Falsifiability

A good thesis must specify what evidence would make us change our mind.
If no plausible observation could materially weaken or invalidate the view,
the thesis is not sufficiently specified.

- **Observable Test:** What metric, event, or failed causal link would count against us?
- **Timeframe and Benchmark:** By when should we observe it, and against what comparison or defensible threshold?
- **Consequence:** Would that evidence lower confidence, require revising an assumption, or make us abandon the thesis?

For probabilistic theses, contrary evidence may accumulate rather than
invalidate the view in one observation. A falling stock price alone need
not invalidate the underlying business thesis.

**Hypothetical capacity-provider example:** “Demand will be strong” is a
starting belief. A more specific candidate variant view is: “The market expects
strong demand but underestimates how quickly new supply will pressure realized
pricing, so revenue per unit of capacity and margins will fall below
expectations.” This is a hypothesis to test, not an established conclusion.

## 4. Identify the Recognition Path

- **Current Barrier:** Why might the market's view persist despite our evidence? Identify a difference in information, interpretation, timing, or incentives that can be tested.
- **Revelation:** What event, disclosure, or gradual accumulation of evidence would make the disagreement observable and favor our view?
- **Transmission:** Why would that evidence change investors' assumptions about the affected drivers or valuation framework?
- **Timing:** When could recognition occur, and what could delay it? Pass this uncertainty to [2E](./2e_calculate_expected_returns.md) for scenario probabilities.

For an emerging driver, recognition might require a segment breakout,
guidance, or repeated results that make its economics measurable. An earnings
release is a recognition event only if it reveals evidence about the debate.
If the path is unclear, preserve that uncertainty in the handoff.

## 5. Handoff to Model Price Impact

- **Clear Variant View:** State the market's assumption, our alternative, and why we differ.
- **Affected Debates and Drivers:** Identify what changes if we are right, the causal links, and the relevant horizon.
- **Evidence and Tests:** Retain supporting evidence, uncertainty, and the falsification test: observable evidence, timeframe, benchmark, and consequence for the thesis.
- **Recognition:** State what could make the disagreement observable to investors, and when.

Pass this to [2D. Model Price Impact](./2d_model_price_impact.md) to quantify
metric deltas and the resulting conditional stock price.
