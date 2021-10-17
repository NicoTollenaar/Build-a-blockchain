const Block = require('./models/block');
const Blockchain = require('./models/blockChain');
const SHA256 = require('crypto-js/sha256');
const fs = require('fs');
const TARGET_DIFFICULTY = BigInt(0x0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
let blockChain = new Blockchain();
let miningProcess = "";

function startMining(transaction) {
    miningProcess = "start";
    mine(transaction);
}

function stopMining () {
    miningProcess = "stop";
    console.log("MININGPROCESS:", miningProcess);
}

async function mine(transaction) {
    console.log("MININGPROCESS:", miningProcess);
    if (miningProcess === "stop") {
        console.log("\n MINING PROCESS STOPPED! \n");
        return;
    }
    let block = new Block();
    block.transactions.push(transaction);
    let blockHash = SHA256(JSON.stringify(block));
    while (BigInt(`0x${blockHash}`) >= TARGET_DIFFICULTY) {
        blockHash = SHA256(JSON.stringify(block));
        block.nonce++;
    }
    block.hash = blockHash.toString();
    blockChain.blocks.push(block);
    blockChain.height = blockChain.blocks.length;
    console.log("HEIGHT: ", blockChain.height);
    if (blockChain.height > 1) {
        block.previousHash = blockChain.blocks[blockChain.height - 2].hash.toString();
     }
    console.log("\nNewly mined block:\n");
    console.log(block);
    try {
        let update = await updateState(blockChain.blocks);
        console.log(update);
        let state = await blockChain.readState();
        console.log(state);
    } catch (err) {
        console.log (err)
    }
}

function updateState (blockchain) {
    return new Promise ((resolve, reject) => {
        fs.writeFile('./State', JSON.stringify(blockchain), (err) => {
            if (err) {
                reject (err);
            } else {
                resolve("\nState succesfully updated:\n");
            }
        });
    });
}

module.exports = {
    startMining,
    stopMining
}