const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 9876;
const windowSize = 10;

let storedNumbers = [];

app.use(cors());

app.get('/numbers/:numberId', async (req, res) => {
  try {
    const numberId = req.params.numberId;
    const apiEndpoint = getApiEndpoint(numberId);

    // Fetch numbers from the third-party server
    const response = await axios.get(apiEndpoint, { timeout: 500 });
    const newNumbers = response.data.numbers;

    // Update stored numbers
    const windowPrevState = [...storedNumbers];
    newNumbers.forEach(number => {
      if (!storedNumbers.includes(number)) {
        storedNumbers.push(number);
      }
    });
    storedNumbers = storedNumbers.slice(Math.max(storedNumbers.length - windowSize, 0));

    // Calculate average
    const avg = storedNumbers.reduce((sum, num) => sum + num, 0) / storedNumbers.length;

    res.json({
      windowPrevState,
      windowCurrState: storedNumbers,
      numbers: newNumbers,
      avg: parseFloat(avg.toFixed(2)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching numbers');
  }
});

function getApiEndpoint(numberId) {
  switch (numberId) {
    case 'p':
      return 'http://20.244.56.144/test/primes';
    case 'f':
      return 'http://20.244.56.144/test/fibo';
    case 'e':
      return 'http://20.244.56.144/test/even';
    case 'r':
      return 'http://20.244.56.144/test/rand';
    default:
      throw new Error('Invalid number ID');
  }
}

app.listen(port, () => {
  console.log(`Average Calculator listening on port ${port}`);
});