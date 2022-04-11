function normalizeNumber(number) {
  return Math.round(number).toLocaleString(undefined, {
    minimumFractionDigits: 0,
  });
}
export default normalizeNumber;
