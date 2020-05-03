const express = require('express');
const multer  =   require('multer');
const path = require('path');
const router = express.Router();

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
  res.sendfile('./index.html')
});

router.get('/test', function(req, res, next) {
	res.send('okokokk')
});

router.post('/testapi', function(req, res, next) {
	console.log('test post', req.body);
	res.send("{'ok': 'cool'");
});

router.post('/api/photo',function(req,res){
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
