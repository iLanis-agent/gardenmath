/* GardenMath engine - pure functions, no DOM. Honest garden bed math.
   Constants stated in the UI: square-foot densities 1/4/9/16 per sq ft,
   144 sq in per sq ft, germination decay ~15% per year in a drawer,
   80% seed-to-harvest survival, catalog yields met at 60-80% in a real bed. */
var GardenMath = (function () {
  function perSqFt(spacingIn) {
    return 144 / (spacingIn * spacingIn);
  }
  function plantsInBed(bedWft, bedLft, spacingIn) {
    return Math.floor(bedWft * 12 / spacingIn) * Math.floor(bedLft * 12 / spacingIn);
  }
  function rowPlants(bedWft, bedLft, spacingIn, rowSpacingIn) {
    var rows = Math.floor(bedWft * 12 / rowSpacingIn);
    var perRow = Math.floor(bedLft * 12 / spacingIn);
    return { rows: rows, perRow: perRow, total: rows * perRow };
  }
  function spacingVerdict(spacingIn) {
    var p = perSqFt(spacingIn);
    if (p >= 9) return 'Intensive spacing - ' + Math.round(p) + ' plants per square foot. The bed feeds you, not the weeds.';
    if (p >= 1) return Math.round(p * 10) / 10 + ' plants per square foot - classic intensive spacing.';
    return 'Wide spacing - room for air and harvest, but the gaps grow weeds.';
  }
  function germByAge(baseGermPct, yearsOld, decayPctPerYear) {
    return baseGermPct * Math.pow(1 - decayPctPerYear / 100, yearsOld);
  }
  function seedsNeeded(plantsWanted, germPct, survivalPct) {
    var rate = (germPct / 100) * (survivalPct / 100);
    if (rate <= 0) return Infinity;
    return Math.ceil(plantsWanted / rate);
  }
  function seedVerdict(germPct) {
    if (germPct >= 80) return 'Fresh seed - sow one per spot, thin later.';
    if (germPct >= 60) return 'Sow two per spot and thin to the stronger one.';
    if (germPct >= 40) return 'Sow three per spot - most of this packet is sleeping for good.';
    return 'Under 40% germination - buy fresh seed instead of gambling a season on this packet.';
  }
  function successions(windowDays, daysToMaturity, staggerDays) {
    var lastStart = windowDays - daysToMaturity;
    if (lastStart < 0) return { count: 0, lastStartDay: lastStart };
    return { count: Math.floor(lastStart / staggerDays) + 1, lastStartDay: lastStart };
  }
  function successionVerdict(count, crop) {
    if (count === 0) return 'The window is too short for ' + crop + ' this year - start indoors or pick a faster crop.';
    if (count === 1) return 'One planting is all the season fits - make it count.';
    return count + ' plantings fit the window - stagger them and harvest continuously.';
  }
  function yieldLb(plants, yieldPerPlantLb, realityFactor) {
    return plants * yieldPerPlantLb * realityFactor;
  }
  function yieldVerdict(factor) {
    if (factor >= 0.9) return 'That assumes a near-perfect season - rare air.';
    if (factor >= 0.7) return 'A realistic planning number for a tended bed.';
    return 'Conservative - fine for planning, but a good year will surprise you.';
  }
  return {
    perSqFt: perSqFt, plantsInBed: plantsInBed, rowPlants: rowPlants, spacingVerdict: spacingVerdict,
    germByAge: germByAge, seedsNeeded: seedsNeeded, seedVerdict: seedVerdict,
    successions: successions, successionVerdict: successionVerdict,
    yieldLb: yieldLb, yieldVerdict: yieldVerdict
  };
})();
if (typeof module !== 'undefined') module.exports = GardenMath;
