const express = require('express');
const multer  =   require('multer');
const path = require('path');
const router = express.Router();
const fs = require('fs');

const storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './data/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage : storage}).any('selectedImage');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('./index.html');
});

router.get('/api/images', function(req, res, next) {
	files = fs.readdirSync('data/uploads');
  console.log(files);
  res.send(files);
});

router.post('/api/photo/upload',function(req,res){
	 console.log(req.body)
    upload(req,res,function(err) {
        if(err) {
        	console.log(err)
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});


module.exports = router;
