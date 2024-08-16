function getProfits(accounts, years) {
    let profitPerYear = 0;
    if (typeof accounts !== 'undefined' && accounts !== null) {
        let capital = accounts.amount;
        let rate = accounts.rate;
        if (capital !== 'null' && rate !== 'null') {
            for (let i = 0; i < years; i++) {
                profitPerYear += (capital * rate) / 100;
                capital += profitPerYear;
            }
        }
    }

    return profitPerYear;
}

export default {
    getProfits
}
