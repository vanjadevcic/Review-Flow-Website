export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const { client_id } = req.query
  if (!client_id) return res.status(400).json({ error: 'Missing client_id' })

  const webhookUrl = process.env.MAKE_CLIENT_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('MAKE_CLIENT_WEBHOOK_URL is not set')
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  try {
    const response = await fetch(
      `${webhookUrl}?client_id=${encodeURIComponent(client_id)}`,
      { headers: { Accept: 'application/json' } }
    )

    if (!response.ok) {
      // If upstream returns 404/400/etc., map to not found/invalid
      const status = response.status
      if (status === 404) return res.status(404).json({ error: 'Client not found' })
      if (status === 400) return res.status(400).json({ error: 'Missing client_id' })
      // Other errors
      return res.status(502).json({ error: 'Upstream error', status })
    }

    const contentType = (response.headers.get('content-type') || '').toLowerCase()
    let data
    if (contentType.includes('application/json')) {
      data = await response.json()
    } else {
      // Some Make webhooks send JSON with text/plain content-type. Try to parse.
      const text = (await response.text()).trim()
      try {
        if (text.startsWith('{') || text.startsWith('[')) {
          data = JSON.parse(text)
        } else {
          console.warn('Upstream non-JSON response:', text)
          return res.status(502).json({ error: 'Invalid upstream response (non-JSON). Ensure the Make scenario returns JSON via "Webhook response".', upstreamBody: text.slice(0, 200) })
        }
      } catch {
        console.warn('Upstream invalid JSON:', text)
        return res.status(502).json({ error: 'Invalid upstream JSON. Ensure the Make scenario returns valid JSON via "Webhook response".', upstreamBody: text.slice(0, 200) })
      }
    }

    if (!data || !data.business_name || !data.google_review_link) {
      return res.status(404).json({ error: 'Client not found' })
    }

    return res.status(200).json({
      client_id,
      business_name: data.business_name,
      logo_url: data.logo_url || '',
      google_review_link: data.google_review_link,
      language: data.language || 'hr',
      timezone: data.timezone || '',
      tone: data.tone || '',
      primary_color: data.primary_color || '',
      secondary_color: data.secondary_color || '',
      background_color: data.background_color || '',
      text_color: data.text_color || '',
      theme_mode: data.theme_mode || '',
      custom_title: data.custom_title || '',
      is_active: data.is_active ?? true,
    })
  } catch (err) {
    console.error('Make.com webhook error:', err)
    return res.status(502).json({ error: 'Failed to fetch client config' })
  }
}
