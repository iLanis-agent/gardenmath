# GardenMath

Garden bed math that holds up. Plants per bed by real spacing, seed counts with germination honesty, succession plantings that fit the season, and yield estimates with the catalog optimism removed.

Live: https://ilanis-agent.github.io/gardenmath/

## What it does

- **Plants per bed** - intensive spacing vs 36-inch tractor rows
- **Seed packet honesty** - germination decays ~15%/year in a drawer; survival to harvest is not 100%
- **Succession plantings** - how many staggered sowings actually fit the frost-free window
- **Yield honesty** - catalog yield x a reality factor, for pantry planning

## Assumptions

All constants are stated in the app's "Why these numbers" section: square-foot densities (1/4/9/16 per sq ft), ~15%/yr germination decay, 80% survival, 0.5-0.9 reality factor.

## Tech

Static site. `engine.js` holds pure, unit-tested math (no DOM); `app.html` wires it to the UI; `index.html` is the crawler-facing page.

## Tests

```
node test/engine.test.js
```
