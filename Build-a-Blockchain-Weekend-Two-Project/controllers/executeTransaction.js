const { startMining } = require("../mine");
const Transaction = require("../models/transaction");

function executeTransaction (req, res) {
    const transaction = new Transaction(req.body.inputTXO, req.body.outputTXO);
    transaction.execute();
    startMining(transaction);
    res.send("message from server: transaction succesfully executed");
}

module.exports = executeTransaction;