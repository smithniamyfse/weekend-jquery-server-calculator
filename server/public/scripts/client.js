// ** Client-Side code is JavaScript code that runs in the user's browser **

$(document).ready(onReady);

// * Global variable *
// Variables are not confined to specific functions and
// can be used elsewhere in the program

// * Declared an operator value with an undefined value
// This operator will be assigned a different value,
// dependant upon which operator function is called
let operator;


// * function onReady
function onReady() {
    // TEST: Check for onReady / DOM existence 
        // console.log('in onReady function: 🟢'); // TEST: SUCCESSFUL

    // Make a request to get the calculationsList as soon as page loads
    calculationsList();

    // Event listeners for the operator buttons 
    // Each event listener asks jQuery to target the element ID and 
    // call the subsequent function when the user interacts or triggers a click
    $('#add-button').on('click', addOperator);
    $('#subtract-button').on('click', subtractOperator);
    $('#multiply-button').on('click', multiplyOperator);
    $('#divider-button').on('click', divideOperator);
    $('#equals-button').on('click', postCalculationsInputs);
}


// * Operator functions 
// The functions below are called dependant upon the
// user interaction triggering which operator they would like
// The function takes the global variable and 
// assigns a value of '+', '-', '*', '/'

function addOperator() {
    // TEST: additionOperator function 
        // console.log('in addOperator function: 🟢'); // TEST: SUCCESSFUL
    // Set operator value to '+'
    operator = '+';
}

function subtractOperator() {
    // TEST: subtractOperator function 
        // console.log('in subtractOperator function: 🟢'); // TEST: SUCCESSFUL
    // Set operator value to '-'
    operator = '-';
}

function multiplyOperator() {
    // TEST: multiplyOperator function 
        // console.log('in multiplyOperator function: 🟢'); // TEST: SUCCESSFUL
    // Set operator value to '*'
    operator = '*';
}

function divideOperator() {
    // TEST: divideOperator function 
        // console.log('in divideOperator function: 🟢'); // TEST: SUCCESSFUL
    // Set operator value to '/'
    operator = '/';
}


// * Function postCalculationsInputs 
// Collects user input, sends the data to the server
// for processing and calculating logic,
// then, updates with calculations
function postCalculationsInputs() {
    // TEST: postCalculationsInputs function 
        // console.log('in postCalculationsInputs function: 🟢'); // TEST: SUCCESSFUL

    // Grabs and stores number input values and
    // the operator into a data object
    let inputsToPost = {
        firstValue: $('#first-value').val(),
        operator: operator,
        secondValue: $('#second-value').val()
    }

    // AJAX POST Method: Sends data to the server 
    $.ajax({
        method: 'POST',
        // Route we will match on the server.js side - app.post('/calculate', (req, res) => {...
        // This route is where all the calculation server-side logic is performed
        url: '/calculate',
        // The object we declared above that "grabs" and sends the user input for
        // first value, operator choice, and second value
        // This will be available as req.body on server.js side
        data: inputsToPost

        // .then() After sending the request, 
        // the function attaches a callback function using .then(). 
        // This callback function will be executed when the server responds successfully 
        // to the client-side request.
    }).then(function(response) {

        // The function calculationsList is called and
        // retrieves from the server the updated list of calculations (server-response)
        calculationsList();

        // The function getAnswers is called to get the 
        // calculation response from the server
        getAnswers();

        // Will display error alert window if issue with code
    }).catch(function(error) {
        alert('❌ Error sending data from calculation.');
    })
}



// * Function calculationsList 
// Retrieves the list of calculations from the server (Method: GET)
// Updates with latest list of calculations in the array
function calculationsList() {
    // TEST: Check calculationsList function 
        // console.log('in calculationsList function: 🟢'); // TEST: SUCCESSFUL

    // AJAX GET Method: Requests data. This can be tested in the browser.
    $.ajax({
        method: 'GET',
        // Route we will match on the server.js side - app.get('/calculations', (req, res) => {...
        // Server-response is to send the calculations array
        url: '/calculations'

    }).then(function(response) {
        // The function listOfCalculations is called and
        // uses the updated calculations array with
        // the calculations and appends
        listOfCalculations(response);

        // ? Experimenting with combining append to render function
        // ? render(listOfCalculations(response));
        // ? render(response);

        // Will display error alert window if issue with code
    }).catch(function(error) {
        alert('❌ Error in retrieving list of calculations.');
    });
}


// * Function getAnswers 
// Retrieves the list of calculations from the server (Method: GET)
// Updates with latest list of calculations in the array
function getAnswers() {
    // TEST: getAnswers function 
        // console.log('in getAnswers function:  🟢'); // TEST: SUCCESSFUL

    // AJAX GET Method: Requests data. This can be tested in the browser.
    $.ajax({
        method: 'GET',
        // Route we will match on the server.js side - app.get('/answer', (req, res) => {...
        // Server-response is to send the answer
        url: '/answer'

    }).then(function(response) {
        // the answer variable is assigned the
        // server's response value and the answer
        answer = response.answer;

        // The function showSolutions is called and
        // uses the solution or answer
        // and appends to 
        showSolutions(answer);

    }).catch(function(error) {
        alert('❌ Error in retrieving the answer.');
    });
}


// * Function showSolutions 
// Receives data or the answer from the the req.body
// being calculated through the server-side logic and
// inserts the solution into the solution element of the DOM
function showSolutions(data) {
    // TEST: showSolutions function 
        // console.log('in showSolutions function:  🟢'); // TEST: SUCCESSFUL

    // ? .html was difficult for me, I just started
    // ? putting in different things until it worked
    // .html() is used to get the contents of solutions data
    // The solution is shown within a <h3> and converted 
    // to a string with commas to help with readability 
    $('#solution').html(`
        <h3>${data.toLocaleString('en-US')}</h3>
    `)

    // ? Experimenting with combining append to render function
    // ? render();
}


// * Function listOfCalculations 
// Updates the list of calculations
// based on the array of calculations received from the server
function listOfCalculations(array) {
    // TEST: listOfCalculations function 
        // console.log('in listOfCalculations function:  🟢'); // TEST: SUCCESSFUL

    // Empty clears the list of calculations element -
    // where the calculations are shown on the browser
    $('#list-of-calculations').empty();

    // The for of loop iterates over each calculation object (toCalculate),
    // pushed into the calculations array 
    for(let calculation of array) {

        // Append - inserts content of the calculations to 
        // list-of-calculations on DOM 
        // Using string interpolation, it creates an ordered list
        // of each calculation with the first value, operator type, second value, and equals the calculated answer
        // all using data from the server-side
                // The last value ${calculation.calculateAnswer} is
                // converted to a string with commas to help with readability 
        $('#list-of-calculations').append(`
            <li>${calculation.firstValue} ${calculation.operator} ${calculation.secondValue} = ${calculation.calculateAnswer.toLocaleString('en-US')}</li>
        `)
        // more calculations are added, - one after the other - with each user interaction

        // ? Experimenting with combining append to render function
            // ? render();
    }
}


// ? Attempted to combine the .appends into
// ? one cohesive render function but ran out of time/research
/* 
function render(array, data) {
    // Render solution to calculation 
    $('#solution').html(`
    <h3>${data}</h3>
    `)

    // Render unordered list of calculations 
    // Empty clears the list of calculations element -
    // where the calculations are shown on the browser
    $('#list-of-calculations').empty();

    // The for of loop iterates over each calculation object (toCalculate),
    // pushed into the calculations array 
    for (let calculation of array) {
        // Append - inserts content of the calculations to 
        // list-of-calculations on DOM 
        // Using string interpolation, it creates an ordered list
        // of each calculation with the first value, operator type, second value, and equals the calculated answer
        // all using data from the server-side
        $('#list-of-calculations').append(`
            <li>${calculation.firstValue} ${calculation.operator} ${calculation.secondValue} = ${calculation.calculateAnswer}</li>
        `)
        // more calculations are added, - one after the other - with each user interaction

    }
}
*/