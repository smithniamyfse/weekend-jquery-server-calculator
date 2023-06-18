// Server-Side is where we create and run our server

// Require express - gives us a function
const express = require('express');

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


let calculationsArray = [];

function addition()


// Start the server!
// Listen for requests on port 5000
// Log message to ensure it is functioning 
app.listen(port, () => {
    console.log('Listening on port ', port);
});