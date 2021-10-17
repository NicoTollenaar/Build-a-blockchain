const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');

function verifySignature (req, res, next) {
    const ec = new EC('secp256k1');
    const publicKey = req.body.address;
    const signature = {
        r: req.body.signature.r,
        s: req.body.signature.s
      };
    const key = ec.keyFromPublic(publicKey, 'hex');
    delete req.body.signature;
    const msg = JSON.stringify(req.body);
    const msgHash = SHA256(msg).toString();
    const isApproved = key.verify(msgHash, signature);
    if (isApproved) {
        console.log("Signature approved! Executing transaction and mining a block");
        next();
    } else {
        res.send("Signature not approved, transaction will not be executed");
    }
}

module.exports = verifySignature;


// // TODO: fill in the public key points
// const publicKey = {
//   x: "2589676a10d9dcec10ca12fcbf6982d0806fa24ea7c4d92f0013a5b48e05fdac",
//   y: "3493d6cf0c2c0aea86b7aa108e2b58358790830719b38b8c103adef4f53d50c1"
// }



// // TODO: change this message to whatever was signed
// const msg = "Hopefully this works better than the RSA decryption!";
// const msgHash = SHA256(msg).toString();

// TODO: fill in the signature components
// const signature = {
//   r: "a4cff863fa2ca83d3dfc19caa42f238260fc9d2992cb76270ac629991e62bf9",
//   s: "961eae576d94e231f0417d9f8449d82a10c5bc5c08a1f30a96e0d2785cf504e0"
// };
