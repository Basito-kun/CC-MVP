const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Replace with your API key if necessary
const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.exchangerate-api.com/v4/latest/';

// Endpoint to get conversion rates
app.get('/convert', async (req, res) => {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
        return res.status(400).json({ error: 'Please provide from, to, and amount parameters.' });
    }

    try {
        // Fetch exchange rates
        const response = await axios.get(`${BASE_URL}${from.toUpperCase()}`);
        const rates = response.data.rates;

        if (!rates[to.toUpperCase()]) {
            return res.status(400).json({ error: 'Invalid currency code.' });
        }

        const convertedAmount = rates[to.toUpperCase()] * amount;
        res.json({ from, to, amount, convertedAmount });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching conversion rate.' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
