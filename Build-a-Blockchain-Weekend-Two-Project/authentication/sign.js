const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
// const { privateKey, transaction } = require('../client');

const ec = new EC('secp256k1');

// TODO: fill in your hex private key

function sign(transaction, privatekey){
    const key = ec.keyFromPrivate(privatekey);
    const message = JSON.stringify(transaction);
    const msgHash = SHA256(message);
    const signature = key.sign(msgHash.toString());
    const signatureComponents = {
    r: signature.r.toString(16),
    s: signature.s.toString(16)
    }
    console.log("in sign, message, msgHash, en signatureComponents:\n");
    console.log(message);
    console.log(msgHash.toString());
    console.log(signatureComponents);    

    return signatureComponents;
}

module.exports = sign;
