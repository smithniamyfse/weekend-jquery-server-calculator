$(document).ready(onReady);

// Global variable(s)
let numberInput1;
let numberInput2;
let add;
let subtract;
let multiply;
let divide;

function onReady() {
    // make a request to get calculations as soon as page loads
    // TODO IS getCalculationInputs(); NECESSARY?
    // getCalculations();

    // Event listener for addition(+) button
    $('add-button').on('click', addition);
    // TODO addition Function

    // Event listener for subtraction(-) button
    $('subtract-button').on('click', subtraction);
    // TODO subtraction Function

    // Event listener for multiplication(*) button
    $('multiply-button').on('click', multiplication);
    // TODO multiplication Function 

    // Event listener for division(/) button
    $('divide-button').on('click', division);
    // TODO division Function 
    
    // Event listener for our equals(=) or submit button
    // TODO Calls the postCalculation function that grabs the ?? 
    // TODO number inputs what is the ?? 
    $('#submit-button').on('click', postCalculation);

};


// ** FUNCTIONS **

// Function to retrieve input data
// TODO IS getCalculationInputs; NECESSARY?
// Make a REQUEST to the server to get calculations
// function getCalculations();

function getCalculationInputs() {
    // AJAX GET Method: Makes a request to server to get data 
    $.ajax({
        method: 'GET',
        url: '/calculation'
    }).then(function(response) {
        console.log('AJAX GET getCalculationInputs', response);
        // Render 
        render(response);
    }).catch(function(error) {
        alert('Request failed :(');
        console.log('Error from server', error);
    })
} // end getCalculationInputs function



function postCalculationInputs(event) {
    console.log('In postCalculations');
    // Stopping default HTML of immediate form submission 
    event.preventDefault()

    // Grab and store input values
    numberInput1 = $('#first-value').val();
    numberInput2 = $('#second-value').val();

    // AJAX POST Method: Sends data to the server 

}


