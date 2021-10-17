const express = require('express');
const app = express();
const cors = require('cors');
const { startMining, stopMining } = require('./mine');
const verifySignature = require('./middleware/verifySignature');
const executeTransaction = require('./controllers/executeTransaction');
const authenticationMiddleware = require('./generateAccounts');
const publicKey = require('./authentication/config');
const PORT = 4001;

app.use(cors());
app.use(express.json()); 
app.use(express.static('./public'));


// app.get('/test', (req, res) => {
//   res.send(`test succesful, this was the request: ${req}`);
// });

// app.post('/miningprocess', (req, res) => {
//   console.log(req.body);
//   let miningProcess = req.body.miningprocess;
//   module.exports = miningProcess;
//   if (req.body.miningprocess === "start") { 
//   startMining();
//   } 
//   if (req.body.miningprocess === "stop") { 
//     stopMining();
//     }
//   res.send(`message from server: post request succesful, miningprocess variable is: ${req.body.miningprocess}`);
// });

app.post('/transaction', verifySignature, executeTransaction);

app.listen(PORT, () => {
  console.log(`The server is listening for requests on PORT ${PORT}`);
});

app.get('/balance/:address', (req, res) => {
  console.log("request for balances from browser received");
  const {address} = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', authenticationMiddleware, (req, res) => {
  const {sender, recipient, amount, msgHash, signature} = req.body;
  console.log("req.body:", req.body);
  balances[sender] -= amount;
  balances[recipient] = (balances[recipient] || 0) + +amount;
  res.send({ balance: balances[sender], message: "Transaction approved!"});
});