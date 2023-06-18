// ** Server-Side is where we create and run our server **

// Require express - gives us a function
const express = require('express');

// Bring body-parser into the project
const bodyParser = require("body-parser");

// Call express to create an Express application
// Express is used to write our server code 
// and simplifies the process for accepting requests and
// returning responses
const app = express();

// The port number tells where the server will be running
const port = 5000;

// Setup express.static files
// When the browser requests static files (html, css),
// Pass everything back into the server/public folder
app.use(express.static('server/public'));

// Use body-parser to properly parse request bodies
// in the POST requests
// Turns request body from "machine language" into
// "human language"
app.use(bodyParser.urlencoded({ extended: true }));


// * Global variable(s) *
// these are not confined to certain functions and
// can be used elsewhere in the program

// * Calculations array 
// assigned as empty and an array to push 
// the server-side calculations as their subsequent,
// toCalculate objects
let calculations = []; 

// * answer variable
// assigned as undefined 
// as a global variable has the ability to be 
// used inside and outside of functions
// stores the answers/solutions to the calculations
let answer; 

// * Express Request / Response Body

// * EXPRESS GET Request: Server sends back dynamic data
// GET: Retrieve data from server
// Route is set up to handle GET requests to the
// '/calculations' endpoint
app.get('/calculations', (req, res) => {

    // Whatever is passed through the `res.send()` is the response body 
    // The calculations array is sent back to client-side, as the response body
    // Client can then retrieve the list of calculations
    res.send(calculations);
})

// * EXPRESS GET Request: Server sends back dynamic data
// GET: Retrieve data from server
// Route is set up to handle GET requests to the
// '/answer' endpoint
app.get('/answer', (req, res) => {

    // An object containing the answer variable is sent back to client-side, 
    // as the response body
    // Client can then retrieve the latest answer from the server
    res.send({answer: answer});
})


// * EXPRESS POST Request: Adding new data to the server
// POST: save new data to the server
// Route is set up to handle POST requests to the '/calculate' endpoint
app.post('/calculate', (req, res) => {
    // When client sends POST request with calculation data,
    // server extracts the necessary values from the request body
    let data = req.body;
    let operator = data.operator;
    let firstValue = Number(data.firstValue);
    let secondValue = Number(data.secondValue);

    // TEST: Using "dummy data"
        // let data = req.body;
        // let operator = '+';
        // let firstValue = 5;
        // let secondValue = 10; // TEST: SUCCESSFUL 🟢

    // A switch statement was used to take in the operator from 
    // the client-side data object inputsToPost
    // The server "finds" the correct operator and calculates
    // the solution based on the corresponding answer variable logic
    switch (operator) {
        case '+':
            answer = firstValue + secondValue;
            console.log(answer);
            break;
        case '-':
            answer = firstValue - secondValue;
            console.log(answer);
            break;
        case '*':
            answer = firstValue * secondValue;
            console.log(answer);
            break;
        case '/':
            answer = firstValue / secondValue;
            console.log(answer);
            break;
        default:
        // If there is an issue with what value a user inputs
        // A 400 Status code will be sent
            res.status(400).send('400 Bad Request: Invalid Data');
            return;
    }
    // The toCalculate object is pushed to the calculations array and
    // is stored in teh server's memory. 
    toCalculate = {
        firstValue: firstValue,
        operator: operator,
        secondValue: secondValue,
        calculateAnswer: answer
    };

    calculations.push(toCalculate);

    // TEST: Using "dummy data"
        // console.log('Dummy data, calculations test: ', calculations.push(toCalculate)); // TEST: SUCCESSFUL 🟢 

    // If the calculation was successful, a status code of 
    // 200, meaning OK, is sent in response. 
    res.sendStatus(200);

});


// Start the server!
// Listen for requests on port 5000
// Log message to ensure it is functioning 
app.listen(port, () => {
    console.log('Listening on port:', port);
})
