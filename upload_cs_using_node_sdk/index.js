"use strict"
const keys = require('./key');
const {
    DragonchainClient
} = require('dragonchain-sdk');
const dragonchainClient = new DragonchainClient(keys.DC_ID_ONE);
// dragonchainClient.overrideCredentials("authKeyId", "authKey"); // Replace that with your actual keys.
const fs = require("fs");
const fs = require("fs");

// load file
const fileZip = () => {
    return fs.readFileSync("calculator.zip", "base64");
}

/**
 * Couple of things to remember before posting.
 * The name and handler must have same name. The handler only .main, 
 * must include runtime,  
 */

const calculatorCustomContract = {
    "version": "2",
    "dcrn": "SmartContract::L1::Create",
    "name": "calculator",
    "sc_type": "transaction",
    "is_serial": true,
    "custom_environment_variables": {},
    "runtime": "nodejs8.10",
    "code": `${fileZip()}`,
    "origin": "custom",
    "handler": "calculator.main"
};

/**
 * Before posting a transaction to calculator, wait for a couple minutes to allow 
 * Dragonchain to complete building your smart contract.
 */

// Version must be 1 not two
const calculatorPayload = {
    "version": "1",
    "txn_type": "calculator2",

/**
 * 
 * Before posting a transaction to calculator, wait for a couple minutes to allow 
 * Dragonchain to complete building your smart contract.
 * 
 */
// Version must be 1 not two
const calculatorPayload = {
    "version": "1",
    "txn_type": "calculatorLit",
    "tag": "12345",
    "payload": {
        "method": "addition",
        "parameters": {
            "numOne": 191919,
            "numTwo": 78787
            "numOne": 3,
            "numTwo": 3
        }
    }
}

//To test your code, please uncomment the each function one by one
const main = async () => {
    try {

    response(await dragonchainClient.createCustomContract(calculatorCustomContract));
    response(await dragonchainClient.createTransaction(calculatorPayload));
    response(await dragonchainClient.queryTransactions('invoker:"1deca0dc-0d66-4762-a78a-fbeb3bdefca4"'));
    response(await dragonchainClient.getSmartContractHeap(keys.DC_ID_ONE, "mainTest", true)
        .then(data => {
            return data
    })

.catch(err => {
    return err
}));


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

main(); // call

