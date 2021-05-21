const express = require('express'); 
const passport = require('passport');


const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../db/img'),
  filename:  (req, file, cb) => {
    // console.log(req);
    cb(null, file.originalname);
  }
})
const uploadImage = multer({
  storage,
  limits: {fileSize: 1000000}
}).single('image');

require('../utils/auth/strategies/jwt')

module.exports = function (app) {
  const router = express.Router()
  app.use('/api/images',router)

  router.post('/upload', 
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req);
    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        console.log(req.file);
        res.send('uploaded');
    });
  });

}