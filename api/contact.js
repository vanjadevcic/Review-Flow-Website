import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, businessName, city, phone, email, type, message, _honeypot } = req.body;

  // Honeypot check - if filled, it's a bot
  if (_honeypot) {
    return res.status(400).json({ error: 'Bot detected' });
  }

  if (!name || !email || !businessName || !city || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'RatingFlow <onboarding@resend.dev>',
      to: 'vanja.devcic@gmail.com',
      replyTo: email,
      subject: `Novi upit s RatingFlow.net - ${businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1c1c1f; color: #ececee; padding: 30px; border-radius: 12px;">
          <h2 style="color: #fbbf24; border-bottom: 2px solid #fbbf24; padding-bottom: 10px; margin-top: 0;">Novi kontakt s RatingFlow.net</h2>
          <div style="background: #09090b; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #222227;">
            <p style="margin: 8px 0; color: #ececee;"><strong>Ime:</strong> ${name}</p>
            <p style="margin: 8px 0; color: #ececee;"><strong>Biznis:</strong> ${businessName}</p>
            <p style="margin: 8px 0; color: #ececee;"><strong>Grad:</strong> ${city}</p>
            <p style="margin: 8px 0; color: #ececee;"><strong>Telefon:</strong> <a href="tel:${phone}" style="color: #fbbf24; text-decoration: none;">${phone}</a></p>
            <p style="margin: 8px 0; color: #ececee;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #fbbf24; text-decoration: none;">${email}</a></p>
            <p style="margin: 8px 0; color: #ececee;"><strong>Tip biznisa:</strong> ${type}</p>
            ${message ? `<p style="margin: 16px 0 8px; color: #ececee;"><strong>Poruka:</strong></p><p style="background: #121214; padding: 12px; border-left: 3px solid #fbbf24; margin: 0; color: #ececee;">${message.replace(/\n/g, '<br>')}</p>` : ''}
          </div>
          <p style="color: #8f8f99; font-size: 12px; text-align: center; margin-top: 30px; margin-bottom: 0;">Poslano s RatingFlow.net kontakt forme</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(400).json({ error: error.message });
    }

    // Send to Make.com webhook
    try {
      await fetch('https://hook.eu1.make.com/a4xb3r8wbq2ut98pe59iy525i7n4lgxb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, businessName, city, phone, email, type, message }),
      });
    } catch (err) {
      console.error('Make.com webhook error:', err);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
