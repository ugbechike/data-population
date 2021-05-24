export const toSquareMetricMiles = (area) => {
  let factor = 0.3861;
  return Math.round(Number(area) * factor);
};
