require('dotenv').config();

module.exports = {
  dev: process.env.ENV !== 'production' ? true : false,
  port: process.env.PORT || 3000,

  gmailUser: process.env.GMAIL_USER,
  gmailPass: process.env.GMAIL_PASSWORD,

  key: process.env.KEY,
};
