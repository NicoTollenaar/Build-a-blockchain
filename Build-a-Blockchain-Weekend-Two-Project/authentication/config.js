const keyPair = require('./generatekey');

const privateKey = keyPair.privateKey;
const publicKey = keyPair.publicKey;

module.exports = publicKey;