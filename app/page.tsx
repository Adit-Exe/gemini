"use client";
import { useState } from 'react';
import Markdown from 'react-markdown'
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyBZjzEBDMRcKfUFpWfiB895sd25VU9_kZg";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export default function GenerativeAIPage() {
  const [ans, setAns] = useState('`model: "gemini-1.5-flash`"');
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const result = await model.generateContent(prompt);
    const answer = result.response.text();
    setAns(answer);
  };

  return (
      <div className='flex justify-center items-center flex-col'>
        <form onSubmit={handleSubmit} className='flex justify-center items-center gap-7 mt-24'>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Prompt'
            className='shadow-xl bg-white rounded-2xl px-4 py-2 h-11 resize overflow-auto'
          />
          <button type="submit" className='shadow-xl bg-white rounded-2xl px-4 py-2 active:text-white' >Ask</button>
        </form>
        <pre className='shadow-xl bg-white rounded-2xl  px-4 py-2 mt-5 max-w-[80%] text-wrap font-sans'>
          <Markdown>{ans}</Markdown>
        </pre>
        <img src="/images/gemini.png" alt="" className='w-80' />

      </div>

   
  );
}
