class Block {
    constructor () {
        this.timestamp = Date.now();
        this.nonce = 0;
        this.transactions = [];
        this.hash = null;
        this.previousHash = null;
    }
}

module.exports = Block;