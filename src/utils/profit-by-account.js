function getProfits(account, years) {
    let profitPerYear = 0;
    if (typeof account !== 'undefined' && account !== null) {
        let capital = account.amount;
        let rate = account.rate;
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
