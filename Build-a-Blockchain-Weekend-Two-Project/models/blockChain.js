const fs = require('fs');

class Blockchain {
    constructor() {
        this.blocks = [],
        this.height = this.blocks.length
    }
    readState () {
        return new Promise((resolve, reject) => {
            fs.readFile('./State', 'utf8', (err, data) => {
                if (err) {
                    reject (err);
                } else {
                    resolve(data);
                }
            });
        })
    }
}

module.exports = Blockchain;