// /api/gpt.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });      
    return;
  }
  const apiKey = process.env.GPT_API; // Vercel 환경변수로 관리
  const { messages, model, max_tokens, temperature } = req.body;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({ model, messages, max_tokens, temperature })
  });
  const data = await response.json();
  res.status(200).json(data);
}
