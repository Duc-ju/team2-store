export function convertDateTime(seconds) {
    const date = new Date(seconds * 1000);
    return (
        date.toLocaleTimeString().slice(0, 5) +
        ', ' +
        date.getDate() +
        ' Tháng ' +
        (date.getMonth() + 1) +
        ', ' +
        date.getFullYear()
    );
}
