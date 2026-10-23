/**
 * uploadService — multer disk storage configured from env.
 *
 * Exposes ready-to-use multer middleware plus a helper to turn a stored
 * filename into a public URL served by the static `/uploads` route mounted
 * in app.js. Callers pick which field name(s) to accept.
 */
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const fs = require('fs')
const config = require('../config/env')

const uploadDir = path.resolve(process.cwd(), config.upload.dir)

// Ensure the destination directory exists on boot.
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    const base = path.basename(file.originalname, ext)
    const safe = base.replace(/[^a-z0-9]+/gi, '-').toLowerCase()
    const unique = crypto.randomBytes(8).toString('hex')
    cb(null, `${safe}-${unique}${ext}`)
  },
})

const allowedMime = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'video/mp4',
  'text/plain',
  'application/zip',
])

function fileFilter(_req, file, cb) {
  if (allowedMime.has(file.mimetype)) return cb(null, true)
  cb(new Error(`File type ${file.mimetype} is not allowed`))
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: config.upload.maxBytes },
})

/**
 * Convert a stored filename into a URL the frontend can fetch.
 * Relies on app.js serving /uploads statically.
 */
function fileUrl(filename) {
  return `/uploads/${filename}`
}

module.exports = { upload, fileUrl, uploadDir }
