const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// API signature
// curl --location 'http://localhost:8000/sum?num1=5&num2=3' \
// --header 'Authorization: Bearer mysecret-token'

// const generateToken = () => {
//   return jwt.sign(
//     {id: id, username: username},
//     'our_secret_key',
//     {expiresIn: '1h'}
//   )
// }

// Middleware to check the valid user
const authMiddleWare = (req, res, next) => {
  const token = req.headers['authorization'];
  // checking with mock token, use Bearer mysecret-token in headers. 
  // Here, we can implement actual jwt token implementation and then validate with actual access-token
  if (token === 'Bearer mysecret-token') {
    next();
  }
  else {
    res.writeHead(401, { "content-Type": 'application/json' })
    res.end(JSON.stringify({ "error": "Invalid User" }))
  }
}

// Define a route to handle incoming requests
app.get('/sum', authMiddleWare, (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  // check whether inputs are numbers or not
  if (isNaN(num1) || isNaN(num2)) {
    res.writeHead(400, { "content-Type": 'application/json' })
    res.end(JSON.stringify({ "error": "Invalid Request" }))
  }
  else {
    const result = num1 + num2;
    res.writeHead(200, { "content-Type": 'application/json' })
    res.end(JSON.stringify({ "result": result }))
  }
});

const port = process.env.PORT || 8000; // Use the port provided by the host or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

