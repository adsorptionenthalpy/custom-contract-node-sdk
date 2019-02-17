const {
    calculatorService
} = require('./src/calculatorService');

/**
 * 
 * Dragonchain-Inc
 * Dragonchain custom smart contract
 * 
 */

//Entry point 
module.exports.main = (event, context, cb) => {
    // Event will have a paylaod. 
    console.log("New payload: \n", JSON.stringify(event.payload), "\n");
    try {
        const {
            method,
            parameters
        } = event.payload;
        // method contains the value needed to trigger the addition function 
        // which returns new value that is stored on the chain
        if (method === "addition") {
            const result = {
                "Values": {
                    "numOne": parameters.numOne,
                    "numTwo": parameters.numTwo
                },
                "Ans": calculatorService.addition(parameters.numOne, parameters.numTwo)
            };
            console.log(result); // Testing the output before deploying.
            cb(null, result);
        }

        if (method === "subtraction") {
            const result = {
                "Values": {
                    "numOne": parameters.numOne,
                    "numTwo": parameters.numTwo
                },
                "Ans": calculatorService.subtraction(parameters.numOne, parameters.numTwo)
            };
            console.log(result); // Testing the output before deploying.
            cb(null, result);
        }
        if (method === "multiplication") {
            const result = {
                "Values": {
                    "numOne": parameters.numOne,
                    "numTwo": parameters.numTwo
                },
                "Ans": calculatorService.multiplication(parameters.numOne, parameters.numTwo)
            };
            console.log(result); // Testing the output before deploying.
            cb(null, result);
        }

    } catch (e) {
        return JSON.stringify({
            "ERROR": +e
        });
    }

}