
module.exports.calculatorService = {
    // these actions can be taken out and put in a separate file.
    addition: (numOne, numTwo) => {
        // Value will be stored on the blockchain
        return numOne + numTwo;
    },
    subtraction: (numOne, numTwo) => {
        // Value will be stored on the blockchain
        return numOne - numTwo;
    },
    multiplication: (numOne, numTwo) => {
        // Value will be stored on the blockchain
        return numOne * numTwo;
    }
}
