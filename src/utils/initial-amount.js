function getInitialAmount(accounts) {
    let initialAmounts = 0;
    if (accounts !== undefined && accounts !== null && accounts.length > 0) {
        for (let i = 0; i < accounts.length; i++) {
            initialAmounts += accounts[i].amount;
        }
    }

    return initialAmounts;
}

export default {
    getInitialAmount
}
