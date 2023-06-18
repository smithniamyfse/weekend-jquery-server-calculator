// ** Client-Side code is JavaScript code that runs in the user's browser **

$(document).ready(onReady);

// * Global variable
// these are not confined to certain functions and
// can be used elsewhere in the program
// Declared an operator value with an undefined value
// This operator will be assigned a different value,
// dependant upon which operator function is called
let operator;

function onReady() {
    // TEST: Check for onReady / DOM existence 
    console.log('in onReady function: 🟢');
    
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
    console.log('in addOperator function: 🟢');
    // Set operator value to '+'
    operator = '+';
}

function subtractOperator() {
    // TEST: subtractOperator function 
    console.log('in subtractOperator function: 🟢');
    // Set operator value to '-'
    operator = '-';
}

function multiplyOperator() {
    // TEST: multiplyOperator function 
    console.log('in multiplyOperator function: 🟢');
    // Set operator value to '*'
    operator = '*';
}

function divideOperator() {
    // TEST: divideOperator function 
    console.log('in divideOperator function: 🟢');
    // Set operator value to '/'
    operator = '/';
}


// * Function postCalculationsInputs 
// Collects user input, sends the data to the server
// for processing and calculating logic,
// then, updates with calculations
function postCalculationsInputs() {
    // TEST: postCalculationsInputs function 
    console.log('in postCalculationsInputs function');

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
        url: '/calculate',
        // The object we declared above that "grabs" and sends the user input for
        // first value, operator choice, and second value
        // This will be available as req.body on server.js side
        data: inputsToPost

        // .then() After sending the request, 
        // the function attaches a callback function using .then(). 
        // This callback function will be executed when the server responds successfully 
        // to the client-side request.
    }).then(function(response){

        // The function calculationsList is called and
        // retrieves from the server the updated list of calculations (server-response)
        calculationsList();

        // The function getAnswers is called to get the 
        // calculation response from the server
        getAnswers();

    }).catch(function(error){
        alert('Error sending data from calculation.');
    })
}


// * Function calculationsList 
function calculationsList() {
    // TEST: Check calculationsList function 
    console.log('in calculationsList function');
    $.ajax({
        method: 'GET',
        url: '/calculations'
    }).then(function(response){
        // will grab the history array and append it to the DOM
        listOfCalculations(response);
    }).catch(function(error){
        alert('error in getHistory function');
    });
} 

function getAnswers() {
    // TEST: getAnswers function 
    console.log('in getAnswers function');
    $.ajax({
        method: 'GET',
        url: '/answer'
    }).then(function(response){
        answer = response.answer;

        showSolutions(answer);
    }).catch(function(error){
        alert('error in getResults function');
    });
} 


function showSolutions(data){
    // TEST: showSolutions function 
    console.log('in showSolutions function');
    $('#solution').html(`
        <h3>${data}</h3>
    `)
} 

function listOfCalculations(array){
    // TEST: listOfCalculations function 
    console.log('in listOfCalculations function')

    $('#list-of-calculations').empty();

    for(let evaluate of array){
        $('#list-of-calculations').append(`
            <li>${evaluate.firstValue} ${evaluate.operator} ${evaluate.secondValue} = ${evaluate.calculateAnswer}</li>
        `) 
    }
} 

