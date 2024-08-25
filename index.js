const express = require('express');
const bodyParser = require('body-parser');
const bfhlRoute = require('./routes/bfhl'); 

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/bfhl', bfhlRoute);

// Root Route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the BFHL API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

