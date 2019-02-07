/**
 * 
 * Dragonchain-inc
 * Dragonchain custom smart contract
 * 
 */

const CalculatorService = {
    // these actions can be taken out and put in a separate file.
    addition: (numOne, numTwo) => {
        // Value will be stored on the blockchain
        return JSON.stringify("Addtion of " + parseInt(numOne) + " + " + parseInt(numTwo)+ " = " + (parseInt(numOne) + parseInt(numTwo)));
    },
    subtraction: (numOne, numTwo) => {
        // Value will be stored on the blockchain
        return JSON.stringify("Subtraction of  " + parseInt(numOne) + " - " + parseInt(numTwo) + " = " + (parseInt(numOne) - parseInt(numTwo)));
    },
    multiplication: (numOne, numTwo) => {
        // Value will be stored on the blockchain
        return JSON.stringify("Multiplication of " + parseInt(numOne) + " + " + parseInt(numTwo)+ " = " + (parseInt(numOne) * parseInt(numTwo)));
    }
}


/** 
 * 
 * Entry point 
 * 
 * Remember to validate your payload manually or using Ajv schema validator.
 * 
 */

module.exports.main = (event, context) => {

    // Event will have a paylaod. 
    console.log("Calling Smart Contract" + JSON.stringify(event.payload));

    try {
        const {
            method,
            parameters
        } = event.payload;

        // method contains the value needed to trigger the addition function which returns new value that is stored on the chain
        if (method === "addition") {
            const result = CalculatorService.addition(parameters.numOne, parameters.numTwo);
            return result;
        }
        if (method === "subtraction") {
            const result = CalculatorService.subtraction(parameters.numOne, parameters.numTwo);
            return result;
        }
        if (method === "multiplication") {
            const result = CalculatorService.multiplication(parameters.numOne, parameters.numTwo);
            return result;
        }
    } catch (e) {
        return "ERROR: " + e;
    }

}