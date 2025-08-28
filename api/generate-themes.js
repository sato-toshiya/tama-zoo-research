// /api/generate-themes.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 👇 この "export default" が重要です！
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
        body = JSON.parse(body);
    }
    
    const { prompt } = body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        response_mime_type: "application/json",
      },
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const jsonText = response.text();
    const parsedResult = JSON.parse(jsonText);
    const themesArray = parsedResult.themes || [];
    
    return res.status(200).json(themesArray);

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return res.status(500).json({ error: 'Geminiとの通信中にサーバーでエラーが発生しました。' });
  }
}