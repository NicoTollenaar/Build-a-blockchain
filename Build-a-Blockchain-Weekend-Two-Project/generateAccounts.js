const express = require('express');
const app = express();
const port = 4001;
const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');

// localhost can have cross origin errors
// depending on the browser you use!

// Generate and log accounts
let ec = new EC('secp256k1');

class Address {
  constructor (accountHolder, privateKey, publicKey, balance) {
    this.accountHolder = accountHolder;
    this.privateKey = privateKey;
    this.publicKey = publicKey;
    this.balance = balance;
  }
}

let accounts = [];
const balances = {}

function generateAccounts(numberOfAccounts) {
  for (let i = 0; i < numberOfAccounts; i++) {
    let accountHolder = i;
    let key = ec.genKeyPair();
    let privateKey = key.getPrivate().toString(16);
    let publicKey = key.getPublic().encode('hex')
    let balance = Math.floor(Math.random()*100);
    accounts[i] = new Address(accountHolder, privateKey, publicKey, balance);
  }
}

function logAccounts (accounts) {
    console.log("\n", "\n");
    console.log("BALANCES:", "\n");
    for (let i = 0; i < accounts.length; i++) {
      console.log("Accountholder:", accounts[i].accountHolder);
      console.log("PublicKey:", accounts[i].publicKey);
      console.log("Balance:", accounts[i].balance, "\n");
    }
    console.log("PRIVATE KEYS:", "\n");
    for (let i = 0; i < accounts.length; i++) {
      console.log("Accountholder:", accounts[i].accountHolder);
      console.log("PublicKey:", accounts[i].publicKey);
      console.log("Private Key:", accounts[i].privateKey, "\n");
    }
}

function assignBalances (accounts) {
  for (let i = 0; i < accounts.length; i++) {
    balances[`${accounts[i].accountHolder}`] = accounts[i].balance;
  }
}

generateAccounts(3);
assignBalances(accounts);
logAccounts(accounts);

function authenticationMiddleware (req, res, next) {
  const sender = req.body.sender;
  const publicKeySender = {
  publicKey: accounts[sender].publicKey,
  }
  const key = ec.keyFromPublic(publicKeySender, 'hex');
  const msgHash = req.body.msgHash.toString();
  const signature = {
    r: req.body.signature.r,
    s: req.body.signature.s
  }
  console.log("signature:", signature);
  console.log("msgHash:", msgHash);
  console.log(key.verify(msgHash, signature));
  if (key.verify(msgHash, signature) === true) {
    next();
  } else {
    res.json({balance: accounts[sender].balance, message: "Authentication failed!"});
  }
}

module.exports = authenticationMiddleware;