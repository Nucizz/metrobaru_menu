export const MoneyFormat = (value) => {
    const roundedValue = Math.round(value * 100) / 100;
    const formattedMoney = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(roundedValue);
    return formattedMoney;
};