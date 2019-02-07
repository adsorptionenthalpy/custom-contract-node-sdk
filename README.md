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
$ cd javascript
$ ls 
calculator.js package.json
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

```node
$ node index.js
```

#### Your output:
```>javascript
Calling Smart Contract{"method":"multiplication","parameters":{"numOne":3,"numTwo":3}}
Multiplication of 3 * 3 = 9
```
#### At this point, zip your calculator with this files included only.

![Custom smart contract](image_here_for_the_file_)
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
    DC_ID: 'DRAGONCHAIN_ID_HERE',
    AUTH_KEY_ID: 'PUT_IT_HERE',
    AUTH_KEY: 'PUT_IT_HERE'
}
```

#### Before posting the calculator custom smart contract, make sure that you have your calculator.zip ready to upload. 

It should look similar to this example.

```js
"use strict"
const keys = require('./key');
const {DragonchainClient} = require('dragonchain-sdk');
const dragonchainClient = new DragonchainClient(keys.DC_ID);
const fs = require("fs");

const fileZip = () => {
    return fs.readFileSync("calculatorFive.zip", "base64")
}

```

#### Here is the payload to pass to the Dragonchain createCustomContract method inside ```service.js```


```js
const calculatorCustomContract = {
    "version": "1",
    "dcrn": "SmartContract::L1::Create",
    "name": "calculator",
    "origin": "custom",
    "sc_type": "transaction",
    "is_serial": true,
    "custom_environment_variables": {},
    "runtime": "nodejs8.10",
    "runtype": "parallel",
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