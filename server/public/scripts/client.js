$(document).ready(onReady);


function onReady() {
    // TEST: Check for onReady / DOM existence 
    console.log('in onReady function');
    
    // Make a request to get the calculationsList as soon as page loads
    calculationsList();
   
    // Event listeners for the operator buttons 
    $('#add-button').on('click', addOperator);
    $('#subtract-button').on('click', subtractOperator);
    $('#multiply-button').on('click', multiplyOperator);
    $('#divider-button').on('click', divideOperator);
    $('#equals-button').on('click', postCalculationsInputs);
}

// Global variable
// these are not confined to certain functions and
// can be used elsewhere in the program
let operator;

// Operator functions 
function addOperator() {
   // TEST: additionOperator function 
    console.log('in addOperator function');
    // Set operator value to '+'
    operator = '+';
}

function subtractOperator() {
    // TEST: subtractOperator function 
    console.log('in subtractOperator function');
    // Set operator value to '-'
    operator = '-';
}

function multiplyOperator() {
    // TEST: multiplyOperator function 
    console.log('in multiplyOperator function');
    // Set operator value to '*'
    operator = '*';
}

function divideOperator() {
    // TEST: divideOperator function 
    console.log('in divideOperator function');
    // Set operator value to '/'
    operator = '/';
}


// Function postCalculationsInputs sends user input data to the server
function postCalculationsInputs() {
    // TEST: postCalculationsInputs function 
    console.log('in postCalculationsInputs function');

    // Stopping default HTML of immediate form submission 
    // event.preventDefault()

    // Grab and store number input values and
    // operator in an data object
    let inputsToPost = {
        firstValue: $('#first-value').val(),
        operator: operator,
        secondValue: $('#second-value').val()
    }

    // AJAX POST Method: Sends data to the server 
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: inputsToPost

        // .then() After sending the request, 
        // the function attaches a callback function using .then(). 
        // This callback function will be executed when the server responds successfully 
        // to the client-side request.
    }).then(function(response){

        // Calling the function calculationsList
        calculationsList();

        // calling the function getAnswers to find the answer
        getAnswers();
    }).catch(function(error){
        alert('error in mathTime function');
    })
}

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

