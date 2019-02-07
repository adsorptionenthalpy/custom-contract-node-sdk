const calculator = require('./calculator');


// Create a payload that does multiplication
const payload = {
    "version": "1",
    "txn_type": "calculator",
    "payload": {
        "method": "multiplication",
        "parameters": {
            "numOne": 3,
            "numTwo": 3
        }
    }
}

const main = () => {
    const result = calculator.main(payload)
    console.log(result);
}

main(); // Run the smart contract.