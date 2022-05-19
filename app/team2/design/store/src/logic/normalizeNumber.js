function normalizeNumber(number) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    }).format(number);
}

export default normalizeNumber;
