class Transaction {
    constructor(inputTXO, outputTXO) {
        this.inputTXO = inputTXO,
        this.outputTXO = outputTXO
    }
    execute() { 
        if (this.inputTXO.spent === true) {
            throw new Error(`${this.inputTXO} already spent!`);
        }
        if (this.inputTXO < this.outputTXO) {
            throw new Error("inputTXO is less than outputTXO!");
        }
        this.inputTXO.spent = true;
        let fee = (this.inputTXO || 0) - (this.outputTXO || 0);
        this.fee = fee;
    }        
}

module.exports = Transaction;