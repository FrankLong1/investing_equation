# 1B. Gather Relevant Context

Status: draft for human review  
Parent: [A Hedge Fund as a Function — Version 4](./hedge-fund-as-a-function-v4.md)

## Purpose

Define the lawful, time-stamped external context entering the framework's investment
loop. It specifies the first two operations that turn an effectively unlimited
world into a bounded research input: **filtration** and **refining**. This
document does not decide what the investment process believes or what the portfolio should do.

## 1. Filtration

### Information Taxonomy

$$
C^E=(\operatorname{Micro},\mathsf T,\operatorname{Macro},M).
$$

- **Micro:** company, asset, industry, value-chain, and capital-structure
  economics.
- **Technology:** capability, cost curve, adoption, architecture, and
  competitive change.
- **Macro:** economic, policy, geopolitical, and physical/social conditions.
- **Market:** expectations (probably the most important, what is priced in), valuation, positioning, flows, liquidity,
  financing, borrow, and market structure.

Within Market, distinguish:

1. **Sentiment:** how bullish or bearish investors are. (e.g. buyside bogey data)
2. **Exposure and Cash:** how much risk investors actually carry and how much cash they hold.
3. **Leverage:** how much exposure is financed or amplified, and how vulnerable it is to forced reduction.
4. **Crowding:** how concentrated investors are in the same names, themes, or trades.

These can diverge: investors can be bullish while holding substantial cash,
or heavily invested without much leverage. Crowding can be high in a few
trades even when overall exposure is modest.

### Relevance Framework

[1A. Understand What Drives the Stock](./1a_stock_drivers.md) defines the basis for
filtration: retain information that could materially affect a relevant stock
through fundamentals, the multiple, technicals, or macro. Include plausible
emerging drivers even when the market does not yet recognize them. The tiers
below identify which holdings, candidates, or read-throughs that information
affects.

$$
\text{External context }(\operatorname{Micro},\mathsf T,\operatorname{Macro},M)
\xrightarrow{\operatorname{Filter}}
\text{Retained external context}.
$$

Classify each candidate observation by the nearest investable object it can
affect. Choose one **primary relevance tier** and record secondary links as
tags:

| Tier                         | What it affects directly                                     | Example transmission                                               |
| ---------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------ |
| **1. Position-relevant**     | An existing holding, hedge, exposure, or portfolio risk.     | A supplier disruption changes the earnings path of a held company. |
| **2. Coverage-relevant**     | An asset that could plausibly enter the portfolio.           | A product launch changes the economics of a covered candidate.     |
| **3. Read-through-relevant** | An entity or mechanism that transmits into Tier 1 or Tier 2. | A customer's demand data read through to a covered supplier.       |

To retain an observation, name its affected entity or universe, causal
channel, horizon, and materiality rationale or uncertainty. A thesis, key
debate, risk monitor, or representation gap can also justify retention when
the asset-level path is still being resolved.

## 2. Refining

Refining turns retained information into source-linked, **semi-structured
information objects**: structured enough to filter, relate, and retrieve, but
not forced prematurely into a fully specified thesis or model.

Each object preserves the original artifact and captures, where available:
source and timing; observation, fact, inference, or forecast type; taxonomy
and relevance tags; affected entities and causal channels; and lineage or
confidence notes. It can also hold a transcript, extraction, or summary, but
those derived forms never replace the source record.

The result is a searchable research corpus. Semantic search finds conceptually
similar evidence; keyword search finds exact terms, entities, and events. Later
research can connect the objects to a thesis, market state, or key debate.

```json
{
  "source": {
    "reference": "primary filing, transcript, dataset, or article",
    "event_time": "when the underlying event occurred",
    "available_time": "when the process could have known it",
    "lineage": ["underlying primary source"]
  },
  "raw_artifact": "original document, transcript, or data observation",
  "extracted": {
    "claim": "the relevant observation or assertion",
    "type": "observation | fact_claim | inference | forecast",
    "summary": "optional short representation",
    "entities": ["issuer, asset, industry, or counterpart"],
    "domains": ["micro", "technology", "macro", "market"],
    "relevance": "position | coverage | read_through",
    "causal_channels": ["optional named path"],
    "confidence_notes": "what is uncertain or unverified"
  }
}
```
