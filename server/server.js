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


// Global variable(s)
// these are not confined to certain functions and
// can be used elsewhere in the program
let calculations = []; 
let answer; 


app.get('/calculations', (req, res) => {
    res.send(calculations);
})

app.get('/answer', (req, res) => {
    res.send({ answer: answer });
})


app.post('/calculate', (req, res) => {
    let data = req.body;
    let operator = data.operator;
    let firstValue = Number(data.firstValue);
    let secondValue = Number(data.secondValue);

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
            res.status(400).send('Bad data, please try again');
            return;
    }

    toCalculate = {
        firstValue: firstValue,
        operator: operator,
        secondValue: secondValue,
        calculateAnswer: answer
    };

    calculations.push(toCalculate);
    res.sendStatus(200);
});


// Start the server!
// Listen for requests on port 5000
// Log message to ensure it is functioning 
app.listen(port, () => {
    console.log('Listening on port:', port);
})
