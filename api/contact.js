export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nombre, email, asunto, mensaje } = req.body;

  if (!nombre || !email || !asunto || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Spenfly Contact <noreply@spenfly.com>',
        to: ['hello@spenfly.com'],
        reply_to: email,
        subject: `[Contacto] ${asunto}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="background: #1D9E75; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px;">
              <h2 style="color: white; margin: 0; font-size: 18px;">Nuevo mensaje de contacto — Spenfly</h2>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; width: 100px; font-size: 14px;">Nombre</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 14px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #1D9E75;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 14px;">Asunto</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${asunto}</td>
              </tr>
            </table>

            <div style="background: #f9f9f9; border-radius: 8px; padding: 16px 20px;">
              <p style="color: #888; font-size: 13px; margin: 0 0 8px;">Mensaje</p>
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${mensaje}</p>
            </div>

            <p style="margin-top: 24px; font-size: 12px; color: #bbb; text-align: center;">
              Spenfly · <a href="https://spenfly.com" style="color: #1D9E75;">spenfly.com</a>
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Error al enviar el mensaje' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
