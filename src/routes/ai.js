const express = require('express');
const router = express.Router();

const mockResponses = [
  'This is a well-structured prompt. Consider adding more context about the target audience.',
  'Great prompt! You might want to specify the desired output format for better results.',
  'Interesting use case. Adding examples could make this prompt even more effective.',
  'Solid prompt structure. Try breaking it into smaller steps for complex tasks.',
  'Good clarity. Adding constraints (e.g., word limit, tone) would improve consistency.'
];

router.post('/ai/ask', (req, res) => {
  const { promptId, promptBody } = req.body;

  if (!promptBody) {
    return res.status(400).json({ error: 'No prompt body provided.' });
  }

  // Pick a deterministic-ish mock response based on prompt length
  const index = promptBody.length % mockResponses.length;
  const response = mockResponses[index];

  // Simulate a short delay to feel realistic
  setTimeout(() => {
    res.json({ response });
  }, 600);
});

module.exports = router;
