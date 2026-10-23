/**
 * emailService — thin nodemailer wrapper.
 *
 * In development (no SMTP configured) it logs the message instead of sending,
 * so password-reset flows can be exercised locally without a mail server.
 * The `send` method never throws to the caller's hot path: email is best-effort
 * and should not fail a registration that already succeeded.
 */
const nodemailer = require('nodemailer')
const config = require('../config/env')

const isConfigured = Boolean(config.smtp.host && config.smtp.user)

let transporter = null
if (isConfigured) {
  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: { user: config.smtp.user, pass: config.smtp.password },
  })
}

/**
 * Send a transactional email. Returns the nodemailer info, or a log object
 * in development. Never rejects — logs errors instead.
 */
async function send({ to, subject, html, text }) {
  if (!isConfigured) {
    // eslint-disable-next-line no-console
    console.log('[email:dev]', { to, subject, text: text || html })
    return { dev: true, to, subject }
  }

  try {
    const info = await transporter.sendMail({
      from: config.smtp.from,
      to,
      subject,
      html,
      text,
    })
    return info
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[email:error]', err.message)
    return null
  }
}

/**
 * Password-reset email body. `link` is the frontend route that carries the
 * token; the backend never renders a reset page itself.
 */
async function sendPasswordResetEmail(to, link) {
  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.6;">
      <h2>Reset your FDTeknova Academy password</h2>
      <p>We received a request to reset your password. Click the button below
      to choose a new one. This link expires in 1 hour.</p>
      <p><a href="${link}" style="padding:10px 20px;background:#2563eb;color:#fff;
        text-decoration:none;border-radius:4px;">Reset password</a></p>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <p style="color:#666;font-size:12px;">FDTeknova Academy</p>
    </div>`
  return send({
    to,
    subject: 'Reset your FDTeknova Academy password',
    html,
    text: `Reset your password: ${link}`,
  })
}

/**
 * Welcome email after successful registration.
 */
async function sendWelcomeEmail(to, name) {
  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.6;">
      <h2>Welcome to FDTeknova Academy, ${name}!</h2>
      <p>Your account is ready. Log in to explore available courses and start
      learning.</p>
      <p style="color:#666;font-size:12px;">FDTeknova Academy</p>
    </div>`
  return send({
    to,
    subject: 'Welcome to FDTeknova Academy',
    html,
    text: `Welcome to FDTeknova Academy, ${name}!`,
  })
}

module.exports = {
  send,
  sendPasswordResetEmail,
  sendWelcomeEmail,
  isConfigured,
}
