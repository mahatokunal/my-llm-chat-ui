const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000'  // Allow requests from the frontend
}));

// Endpoint to handle chat requests
app.post('/ask', async (req, res) => {
  const question = req.body.question;
  
  // Mock response from LLM
  const answer = `This is a mock response to your question: "${question}"`;
  res.json({ answer });
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
