const express = require('express');
const router = express.Router();
const examples = require('../data/examples'); 

// GET Method
router.get('/', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

// POST Method
router.post('/', (req, res) => {
  const { data } = req.body;

  // Input validation
  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input, expected an array."
    });
  }

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
  const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
  const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

  // Find a matching entry in the examples array
  const user = examples.find(example =>
    JSON.stringify(example.numbers) === JSON.stringify(numbers) &&
    JSON.stringify(example.alphabets) === JSON.stringify(alphabets) &&
    JSON.stringify(example.highest_lowercase_alphabet) === JSON.stringify(highestLowercaseAlphabet)
  );

  if (user) {
    return res.status(200).json({
      is_success: true,
      user_id: user.user_id,
      email: user.email,
      roll_number: user.roll_number,
      numbers: user.numbers,
      alphabets: user.alphabets,
      highest_lowercase_alphabet: user.highest_lowercase_alphabet,
    });
  } else {
    return res.status(404).json({
      is_success: false,
      message: "Data not found."
    });
  }
});

module.exports = router;
