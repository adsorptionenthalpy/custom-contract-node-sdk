## Welcome to the Dragonchain code sample repository

> These code samples are an example of Dragonchain custom smart contract. You will be deploying a calculator smart contract and post some transactions.
There are currently two SDKs with more to come that can communicate with Dragonchain platform. Take a look at the node sdk below

> [Dragonchain Node SDK](https://github.com/dragonchain-inc/dragonchain-sdk-node)


## How to test each custom smart contract locally
#### First clone the code

```bash
$ git clone <this_repo_link_here>
$ cd <into_this_repo_you_cloned>
```

#### Using the JavaScript Dragonchain Smart Contract
> To be able to run your javascript code, please make sure you are inside your javascript directory.

```bash
$ cd custom-contract-js
$ ls 

calculator.js   calculatorService.js  package.json
```

> The ```package.json``` file lists modules this project installs from npm. However, we are not using any for calculator.js. The package.json has "main", this is where your calculator.js will be called. It should match your file name to avoid issues.
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
$ node index.js
```

#### Your output:
```javascript
New payload:
 {"method":"multiplication","parameters":{"numOne":3,"numTwo":3}}

{ Values: { numOne: 3, numTwo: 3 }, Ans: 9 }
```
#### At this point, zip your calculator with this files included only.

![Custom smart contract](https://github.com/dragonchain-inc/custom-smart-contract-node-sdk/blob/master/assets/js.png)
```
calculator.js
package.json
```

#### Next, cd into the using_sdk_post directory and run npm install to download the dragonchain-sdk.

```
$ cd ..
$ cd using_sdk_post
$ npm install
```

#### Change the values in your `keys.js` to your key's values.

```js
module.exports = {
    //[Chain One] you can add many chains here
    DC_ID_ONE: 'DRAGONCHAIN_ID_HERE',
    AUTH_KEY_ID: 'PUT_IT_HERE',
    AUTH_KEY: 'PUT_IT_HERE'
}
```

#### Before posting the calculator custom smart contract, make sure that you have your calculator.zip ready to upload. 

It should look similar to this example.

```js
"use strict"
const keys = require('./key');
const {
    DragonchainClient
} = require('dragonchain-sdk');
const dragonchainClient = new DragonchainClient(keys.DC_ID_ONE);
const fs = require("fs");

// load file
const fileZip = () => {
    return fs.readFileSync("calculator.zip", "base64");
}

```

#### Here is the payload to pass to the Dragonchain createCustomContract method inside ```service.js```


```js
const calculatorCustomContract = {
    "name": "calculator",
    "sc_type": "transaction",
    "is_serial": true,
    "custom_environment_variables": {},
    "runtime": "nodejs8.10",
    "code": `${fileZip()}`,
    "handler": "calculator.main"
};

dragonchainClient.createSmartContract(calculatorCustomContract); 
```

#### To use the NODE_SDK to post the calculator contract, run this command

```bash
$ node index.js

Successful call!
Block: {
  "success": "Contract creation in progress."
}
```

#### Congratulations! :boom: :dragon:  You are one step away from posting your first transaction to your calculator smart contract

#### Here is how to post transction to your calulator
> Before posting your transcation, comment out the     
```
// response(await dragonchainClient.createCustomContra(calculatorCustomContract));
```

>Then run this command.
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
```

```bash
$ node index.js

Successful call!
Block: {
  "transaction_id": "" // Your will be different
}
```

####You can verify your transaction by calling the

```js
dragonchainClient.queryTransactions('invoker:"tx_id"')
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

#### How do you access your data in the blockchain?
> Dragonchain blockchain uses heap which stores data to the blockchain. 

>What is a heap? A heap is a chain storage value where your smart contract state/data stored on the chain. Heap takes a (key, value). You can use the key to get data you stored on your blockchain. 
If you take a look at the calculator smart contract, you will notice that we are returning key value state/data. Example in the code:
```js

"Values": {
    "numOne": parameters['numOne'],
    "numTwo": parameters['numTwo']
},
"Ans": calculatorService.addition(parameters)
}
```


> The above key value is stored in the blockchain. To access the data, you do the following.
Keys: Values and Ans
```py

# Get single data from the heap
response(await dragonchainClient.getSmartContractHeap("Values", "calculator2", true));
 # returns the answer value

```


Congratulations! :boom: :dragon:  You have done it. Feel free to reach so we can improve our sdk. 
### More projects to come...