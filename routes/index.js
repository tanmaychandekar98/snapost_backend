const express = require('express');
const multer  =   require('multer');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Configure local storage of images
const storage =   multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './data/uploads');
	},
	filename: function (req, file, callback) {
		callback(null, req.body.userId + '-' + file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});
const upload = multer({ storage : storage});

// Configure database
const adapter = new FileSync('./data/db.json')
const db = low(adapter)
const Users = db.get('users');
const Images = db.get('images');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendfile('./index.html');
	console.log(db.get('users').find({userId : 'tanmay'}).value());
});


// Get all image urls
router.get('/images/urls', function(req, res, next) {
	console.log('Request received for image URLs fetch');

	res.json({ images : Images.value()});
});

router.get('/images/urls/:userId', function(req, res, next) {
	user_images = []
	console.log('fetching images for user', req.params.userId);


	Users.find({ userId : req.params.userId})
		.get('images')
		.value()
		.forEach(function(imgName) {
			console.log(imgName);
			user_images.push(
				Images.find({ imgName : imgName })
					.value()
			);
		});

		res.json({images: user_images});
});

// Request for image upload
router.post('/image/upload', upload.single("selectedImage"), function(req,res){
 	console.log('Request received for uploading image')

	if(db.get('users').find({userId : req.body.userId}).value()) {

		// store image locally
		Users.find({ userId: req.body.userId})
			.get('images')
			.push(req.file.filename)
			.write();

		Images.push(getImageObject(req))
			.write();

		res.json({"msg" : "Upload success"});

	} else {

		console.log('Invalid user !');
		res.json({"msg" : "Invalid user ! Upload failed"});
		fs.unlinkSync(req.file.path);
		console.log('Uploaded Image deleted')
	}
});


// Like request for image
router.post('/image/like', function (req, res) {
	console.log('Like recieved by server')

	getImage = Images.find({ imgName : req.body.imgName });
	old_likes = getImage.value().likes

	getImage.assign({ likes : old_likes+1 })
		.write();

	res.json({"msg" : "Like added"});
});


// Build image object for db
function getImageObject(req) {
	return {
		imgName : req.file.filename,
		userId : req.body.userId,
		likes : 0
	}
}

module.exports = router;
