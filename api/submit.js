export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { client_id, location_id, rating, message, name, phone, email, consent } = req.body

  if (!client_id || !rating || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const webhookUrl = process.env.MAKE_WEBHOOK_URL

    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id,
          location_id,
          rating,
          message,
          name: name || '',
          phone: phone || '',
          email: email || '',
          consent: Boolean(consent),
          source: 'ratingflow-feedback',
          created_at: new Date().toISOString(),
        }),
      })

      if (!webhookRes.ok) {
        return res.status(502).json({ error: 'Webhook request failed' })
      }
    }

    return res.status(200).json({ success: true })
  } catch {
    return res.status(500).json({ error: 'Failed to submit feedback' })
  }
}
