require('dotenv').config()

module.exports = {
  dev : process.env.ENV !== 'production' ? true : false,
  port : process.env.PORT || 3000,
  db: process.env.DB,
  gmailUser: process.env.GMAIL_USER,
  gmailPass: process.env.GMAIL_PASSWORD,
  authJwtSecret: process.env.AUTH_JWT_SECRET, 
  publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN
}