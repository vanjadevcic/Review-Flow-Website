// Mock client config — replace with database lookup in production
const clients = {
  abc123: {
    business_name: 'Caffe Ziggy',
    logo_url: '/logos/abc123.png',
    google_review_link: 'https://g.page/caffe-ziggy/review',
  },
  demo: {
    business_name: 'Demo Restoran',
    logo_url: '/logos/demo.png',
    google_review_link: 'https://g.page/demo-restoran/review',
  },
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { client_id } = req.query

  if (!client_id) {
    return res.status(400).json({ error: 'Missing client_id' })
  }

  const config = clients[client_id]

  if (!config) {
    return res.status(404).json({ error: 'Client not found' })
  }

  return res.status(200).json(config)
}
