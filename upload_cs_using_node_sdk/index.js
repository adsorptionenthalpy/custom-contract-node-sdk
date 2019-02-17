'use strict'
const fs = require('fs')
const { DragonchainClient, setLogger, logger } = require('dragonchain-sdk')
setLogger('dragonchain-sdk') // Logger incase you want view additional information.
// Replace that with your actual keys.
const dragonchainClient = new DragonchainClient("Dragonchain_id")
dragonchainClient.overrideCredentials("authKeyId", "authKey"); 
// Make sure that you have the calculator.zip
const fileZip = () => {
  return fs.readFileSync('calculator.zip', 'base64')
}

const calculatorCustomContractPayload = {
  version: '2',
  dcrn: 'SmartContract::L1::Create',
  name: 'calculator',
  sc_type: 'transaction',
  is_serial: true,
  custom_environment_variables: {},
  runtime: 'nodejs8.10',
  code: `${fileZip()}`,
  origin: 'custom',
  handler: 'calculator.main'
}

/**
 * Before posting a transaction to calculator, wait for a couple minutes to allow
 * Dragonchain to complete building your smart contract.
 */

// Version must be 1 not twos
const calculatorPayload = {
  version: '1',
  txn_type: 'calculator',
  payload: {
    'method': 'addition',
    'parameters': {
      'numOne': 30,
      'numTwo': 20
    }
  }
}

const registerTransactionType = {
    "version": "1",
    "txn_type": "Your_Transaction_Name_here",
    "custom_indexes": [
      {
        "key": "New, transaction, awesome",// This will allow you to be able to query this transaction
        "path": ""
      }
    ]
}

// To test your code, please uncomment the each function one by one
const main = async () => {
  try {
    // EXECUTE THESE FUNCTIONS ONE BY ONE

    // Before posting payload to create custom contract, make sure that everything is good
    response(await dragonchainClient.createCustomContract(calculatorCustomContractPayload));

    // Register a transaction if you would like to just post transactions. Comment out createCustomContract code
    response(await dragonchainClient.registerTransactionType(registerTransactionType));

    // Create a transaction the calculator payload above. Remember to comment out registerTransactionType code.
    // Copy the returned transaction_id and paste to the function below
    response(await dragonchainClient.createTransaction(calculatorPayload))

    // Get the transaction_id above and comment out createTransaction code.
    response(await dragonchainClient.queryTransactions('invoker:"transaction_id"'))

    // Get/access data stored in the heap by passing keys and the name of the smart contract.
    // Values is a key, and calculator is a smart contract name.
    response(await dragonchainClient.getSmartContractHeap("Values", "calculator", true));

  } catch (e) {
    console.log(e)
  }
}

const response = call => {
  if (call.ok) {
    console.log('Successful call!')
    console.log(`Block: ${JSON.stringify(call.response, null, 2)}`)
  } else {
    console.error('Something went wrong!')
    console.error(`HTTP status code from chain: ${call.status}`)
    console.error(
      `Error response from chain: ${JSON.stringify(call.response, null, 2)}`
    )
  }
}

main()
