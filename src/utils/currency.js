export const numberToUSDCurrencyFormat = (amount = 0) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
        amount,
    );
};
