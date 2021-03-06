# Welcome to building on Dragonchain Platform

This tutorial is designed for those looking to build blockchain solution on Dragonchain platform. It includes writing a calculator smart contract and how to use Dragonchain Node SDK.

# Attention:

> ## The Dragonchain Platform is implementing improvements that will allow developers to write smart contracts in a variety of programming languages using Docker images.

### Target audience 

Developers developers developers

### This short tutorial aims to answer the following

* System requirements
* Test smart contract locally
* Structure of smart contact
* Authentication requirements
* How to post a smart contract
* How to post a transaction
* How to query current transaction 
* How to register a transaction 

### System requirements

There are currently two SDKs with more to come that can communicate with Dragonchain platform. Please go check out our SDKs for more information in the links below.

> [Dragonchain Node SDK](https://github.com/dragonchain-inc/dragonchain-sdk-node)

* Must have Nodejs installed
* Have an Ide/editor like vscode from Microsoft to use or any editor you are comfortable with.

### Test smart contract locally
#### First clone the code

```bash
→ git clone <this_repo_link_here>
→ cd <into_this_repo_you_cloned>
```

#### Using the JavaScript Dragonchain Smart Contract
> To be able to run your javascript code, please make sure you are inside your javascript directory.

```bash
→ cd custom-contract-js
```

The ```package.json``` file lists modules this project installs from npm. However, we are not using any for calculator.js. The package.json has "main", this is where your calculator.js will be called. It should match your file name to avoid issues.
```js
{
  "name": "calculator",
  "version": "1.0.0",
  "description": "",
  "main": "calculator.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```


#### To test this example, run the following:
Before running the code, you should read look into the index, calculator and the calculatorService files to understand what is happening.
```node
→ node index.js
```

#### Your output:
```javascript
New payload:
 {"method":"multiplication","parameters":{"numOne":3,"numTwo":3}}

{ Values: { numOne: 3, numTwo: 3 }, Ans: 9 }
```
#### At this point, zip your calculator with this files included only.

### Structure of smart contract

![Custom smart contract](https://github.com/dragonchain-inc/custom-smart-contract-node-sdk/blob/master/assets/js.png)


Next, cd into the using_sdk_post directory and run npm install to download the dragonchain-sdk.

```
→ cd ..
→ cd using_sdk_post
→ npm install
```


#### Before posting the calculator custom smart contract, make sure that you have your calculator.zip ready to upload. 


### Authentication requirements

* Click view chains and copy "ChainId"
* Locate "Generate New API Key": You will be given to two keys.
* Copy and paste the your keys below:

```js
"use strict"
const fs = require('fs')
const { DragonchainClient} = require('dragonchain-sdk')
const dragonchainClient = new DragonchainClient("Dragonchain_id") // Replace with your actual chain id
dragonchainClient.overrideCredentials("authKeyId", "authKey"); // Replace with your actual keys
```
### How to post a smart contract

 Here is the payload to pass to the Dragonchain createCustomContract method inside ```index.js```

```js
const calculatorCustomContractPayload = {
  version: '2',
  dcrn: 'SmartContract::L1::Create',
  name: 'calculator',
  sc_type: 'transaction',
  is_serial: true,
  custom_environment_variables: {},
  runtime: 'nodejs8.10',
  code: `${fileZip()}`, // Make sure that this file you are able to access in accessible 
  origin: 'custom',
  handler: 'calculator.main'
}

dragonchainClient.createSmartContract(calculatorCustomContractPayload); 
```

> Run this command

```bash
→ node index.js
Successful call!
Block: {
  "success": "Contract creation in progress."
}
```

#### Congratulations! :boom: :dragon:  You are one step away from posting your first transaction to your calculator smart contract

### How to post transaction

``

> This is your transaction payload. Cross check with your code sample inside index.

```js
const calculatorPayload = {
    "version": "1",
    "txn_type": "calculator",
    "tag": "12345",
    "payload": {
        "method": "addition",
        "parameters": {
            "numOne": 3,
            "numTwo": 3
        }
    }
}

response(await dragonchainClient.createTransaction(calculatorPayload))

```

> Then run this command.

```bash
$ node index.js

Successful call!
Block: {
  "transaction_id": "" // Your will be different
}
```

### How to query current transaction 
You can verify your transaction by calling the function below.

```js
dragonchainClient.queryTransactions('invoker:"transaction_id"') // Follow the code on index.js
```

```json
Successful call!
Block: {
  "results": [
    {
      "version": "1",
      "dcrn": "Transaction::L1::FullTransaction",
      "header": {
        "txn_type": "calculator",
        "dc_id": "D_CHAIN_ID",
        "txn_id": "1deca0dc-ff5f-46bc-a968-5112a8b1b981",// Not real
        "block_id": "3132322", // Not real
        "timestamp": "1549588944",
        "tag": "12345",
        "invoker": "txn_id"
      },
      "payload": {
        "Ans": 6,
        "Values": {
          "numOne": 3,
          "numTwo": 3
        }
      },
      "proof": {
        "full": "EWERWEwFUfALH75G/pj0/n3/j5ufyz8UOzS1SQxQes=", // Not real
        "stripped": "RRRRRRRRfXDWmfKKB+gUGG+K0pqm3wGvSeJwVfBPtPZAiAmcXC+3WwgpHaOSHyo2QoJakOV1HyLDzhliIU0ce3yrw==" //Not real
      }
    }
  ],
  "total": 1
}
```

#### Heap
> Dragonchain blockchain uses heap which stores data to the blockchain. 
What is a heap? A heap is a chain storage value where your smart contract state/data stored on the chain. Heap takes a (key, value). You can use the key to get data you stored on your blockchain. 
If you take a look at the calculator smart contract, you will notice that we are returning key value state/data. Example in the code:
```js

return { 
    "Values": {
      "numOne": parameters['numOne'],
      "numTwo": parameters['numTwo']
  },
  "addition": calculatorService.addition(parameters)
  }
}
```


> The above key value is stored in the blockchain. To get your contract head, you must do the following:

```js
Get single data from the heap
response(await dragonchainClient.getSmartContractHeap("addition", "calculator", true));

This will return whatever the value is from the heap

```

### How to register a transaction

```js

const registerTransactionType = {
    "version": "1",
    "txn_type": "Your_Transaction_Name",
    "custom_indexes": [
      {
        "key": "New, transaction, awesome",// This will allow you to be able to query this transaction
        "path": ""
      }
    ]
}
// Register a transaction if you would like to just post transactions. Comment out createCustomContract code
response(await dragonchainClient.registerTransactionType(registerTransactionType));

```
#### Post to your new transaction.

```js
const txn_payload = {
  "version": "1",
  "txn_type": "Your_Transaction_Name",
  "tag": "",
  "payload": "Posting my first transaction to Dragonchain"
}    

response(await dragonchainClient.createTransaction(calculatorPayload))

```

### Congratulations! :boom: :dragon:  You have done it. Feel free to try out our SDK and give us any feedback.