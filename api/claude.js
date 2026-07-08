export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' })
  try {
    const { prompt, system, messages } = req.body
    const body = {
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: messages || [{ role: 'user', content: prompt }],
    }
    if (system) body.system = system
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify(body),
    })
    const data = await r.json()
    return res.status(r.ok ? 200 : r.status).json(data)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
