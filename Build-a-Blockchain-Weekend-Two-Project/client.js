const axios = require('axios');
const server = "http://localhost:4001";
const argv = require('yargs').argv;
const generateKeys = require('./authentication/generatekey');
const sign = require('./authentication/sign');
const Transaction = require('./models/transaction');
const TXO = require('./models/txo');
console.log(argv);
// let instruction = argv.instruction;
let input = argv.input;
let output = argv.output;
let address = argv.address;
let privateKey = argv.privatekey;
console.log("this is privateKey after taken from argv:", privateKey);
// if (instruction) {
// axios.post(`${server}/miningprocess`, {miningprocess : `${instruction}`})
//   .then((response)=> {
//       console.log("post request succesful, below is response:");
//       console.log(response.data);
//   }).catch((err)=> console.log(err));
// }


if (input && output && address && privateKey) {
    let inputTXO = new TXO("Nico", input);
    let outputTXO = new TXO("Nico", output);
    const data = {
        inputTXO,
        outputTXO,
        address
    }
    const signature = sign(data, privateKey);
    data.signature = signature;
    axios.post(`${server}/transaction`, data)
    .then((response)=> {
      console.log("post request succesful, below is response:");
      console.log(response.data);
    }).catch((err)=> console.log(err));
}



