# Server-Side Calculator 

## Description
I was responsible for building a server-side calculator. On the server, the logic for the calculator was programmed. 

Technology Used:
- HTML
- CSS
- JavaScript
    - jQuery
    - Node
    - Express
    - AJAX

## Capabilities  
# Server-Side Code
The server can be used to perform a variety of mathematical operations on a given set of data. The server performs the necessary logic to handle addition, subtraction, multiplication, and division. The program also keeps track of all math operations and their solutions in order to maintain a record of the calculations that have been performed. Congruently, the calculator project also incorporates Express Request / Response bodies. An Express POST request is accepted from the client when the calculation is submitted, while a GET request returns the results.

# Client-Side Code
With regards to the client-side code for the calculator, it is easy to use as it provides a straightforward interface for the user. Users can input two values and select the desired mathematical operation (+, -, *, or /). As soon as the user clicks the equals button, the client-side code captures the input, packages the data into an object, and sends it to the server via an AJAX POST request. The calculator also features a 'C' button that resets the input fields. Moreover, an AJAX GET request is used to get a list of previous calculations from the server. The client-side code automatically updates the calculation history after a new calculation. A server-side storage system ensures the user's calculation history remains even after refreshing the page. 

