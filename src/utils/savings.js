function getSavings(accounts, years) {
    let savings = [];
    let year = 0;
    for(let i = 0; i < years; i++) {
        year++;
        let savingsPerYear = 0;
        for (let j = 0; j < accounts.length; j++) {
            savingsPerYear += year * accounts[j].m_savings;
        }
        savings.push(savingsPerYear);
    }

    return savings;
}

export default {
    getSavings
}
