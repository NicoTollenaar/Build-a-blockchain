const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);

const blocks = [];

function mine() {
    // TODO: mine a block
    let transactions = [];
    const block = {
    id: blocks.length
    }
    
    while (BigInt(`0x${hash}` >= TARGET_DIFFICULTY) {
        hash = SHA256(JSON.stringify(`${block.timestamp} ${block.nonce} ${block.transactions}`));
        if (BigInt(`0x${hash}`) < TARGET_DIFFICULTY) {
            break;
        }
        block.nonce += 1;
    }
    block.hash = SHA256(JSON.stringify(block));
    blocks.push(block);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};