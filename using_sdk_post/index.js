"use strict"
const keys = require('./key');
const {
    DragonchainClient
} = require('dragonchain-sdk');
const dragonchainClient = new DragonchainClient(keys.DC_ID);
const fs = require("fs");


// load file
const fileZip = () => {
    // return fs.readFileSync("calculator2.zip", "base64")
}

/**
 * 
 * Start with this first.
 *  
 */
const calculatorCustomContract = {
    "version": "1",
    "dcrn": "SmartContract::L1::Create",
    "name": "calculator",
    "sc_type": "transaction",
    "is_serial": true,
    "custom_environment_variables": {},
    "runtime": "nodejs8.10",
    "runtype": "parallel",
    "code": `${fileZip()}`,
    "origin": "calculator",
    "handler": "calculator.main"
};


/**
 * 
 * Before posting a transaction to calculator, wait for a couple minutes to allow 
 * Dragonchain to complete building your smart contract.
 * 
 */
const calculatorPayload = {
    "version": "1",
    "txn_type": "calculator5",
    "tag": "",
    "payload": {
        "method": "multiplication",
        "parameters": {
            "numOne": 90,
            "numTwo": 3
        }
    }
}

const main = async () => {
    // To test your code, please uncomment the exach function one by one
    // response(await dragonchainClient.createCustomContract(calculatorCustomContract));
    response(await dragonchainClient.createTransaction(calculatorPayload)); 
    // response(await dragonchainClient.getTransaction("transaction_id"));
    // response(await dragonchainClient.queryTransactions('invocker:"3238d210-7d26-4263-baad-d606c1167220'));
};

const response = (call) => {
    if (call.ok) {
        console.log('Successful call!');
        console.log(`Block: ${JSON.stringify(call.response, null, 2)}`);
    } else {
        console.error('Something went wrong!');
        console.error(`HTTP status code from chain: ${call.status}`);
        console.error(`Error response from chain: ${JSON.stringify(call.response,null, 2)}`);
    }
}


try {
    main();

} catch (e) {
    console.log(e);
}