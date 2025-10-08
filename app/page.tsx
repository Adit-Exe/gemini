"use client";
import { useState } from 'react';
import Markdown from 'react-markdown'
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyA_4vsCn2Slcz2mTnwAC2ga7c_baYDOfnw";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export default function GenerativeAIPage() {
  const [ans, setAns] = useState('');
  const [prompt, setPrompt] = useState('');
  const [hline, setHline] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    setHline(prompt);
    setAns("Gettting response...");
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
      <div className='max-w-[80%] w-full mt-9'>
        <h1 className='self-start font-bold text-3xl sm:text-5xl'>{hline}</h1>

      </div>



      <pre className='mt-5 max-w-[80%] text-wrap font-sans text-md sm:text-lg'>
        <Markdown>{ans}</Markdown>
      </pre>

      <img src="/images/image.png" alt="" className='sm:w-96 w-60' />

    </div>


  );
}
