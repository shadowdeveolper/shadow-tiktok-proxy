const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// POST endpoint to forward TikTok view orders
app.post('/api/order', async (req, res) => {
  const { service, link, quantity } = req.body;

  try {
    const response = await axios.post('https://api.shadowsmm.com/v2', {
      key: process.env.SHADOW_API_KEY,
      action: 'add',
      service,
      link,
      quantity
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error forwarding request:', error.message);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
