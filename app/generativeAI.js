// pages/api/generativeAI.js

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = ("AIzaSyBZjzEBDMRcKfUFpWfiB895sd25VU9_kZg");
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;

      const result = await model.generateContent(prompt);

      res.status(200).json({ text: result.response.text() });
    } catch (error) {
    
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });

  }
}
