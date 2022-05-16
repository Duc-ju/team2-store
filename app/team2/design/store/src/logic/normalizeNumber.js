function normalizeNumber(number) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1
    }).format(number);
}

export default normalizeNumber;
