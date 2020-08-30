const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
require('dotenv/config');
const mainRouter = require('./main-router/main-router');
const middlewares = require('./middlewares/middlewares');
// const publicRoutes = require('./routes');

const app = express();
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());

app.get(express.static(__dirname + "/public"));



/// admin css ///
app.get('/admin/css', (req, res) => {
	res.sendFile(__dirname + "/public/admin/css/style.css");
})
app.get('/admin/post-image', (req, res) => {
	const imageQuery = req.query.image;
	res.sendFile(__dirname + '/images/posts/' + imageQuery);
})
app.get('/admin/admin-image', (req, res) => {
	const imageQuery = req.query.image;
	res.sendFile(__dirname + '/images/admin/' + imageQuery);
})
/// admin public routes ///
app.get('/admin', (req, res) => {
	res.sendFile(__dirname + "/public/admin/login.html");
})
app.get('/admin/dashboard', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/index.html");
})
app.get('/admin/users', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/user-activity.html");
})
app.get('/admin/posts', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/manage-posts.html");
})
app.get('/admin/new-post', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/add-post.html");
})
app.get('/admin/edit-post', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/edit-post.html");
})
app.get('/admin/categories', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/categories.html");
})
app.get('/admin/new-category', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/add-category.html");
})
app.get('/admin/new-user', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/add-user.html");
})
app.get('/admin/edit-category', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/edit-category.html");
})
app.get('/admin/edit-user', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/edit-user.html");
})
app.get('/admin/add-slider-post', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/add-slider-posts.html");
})
app.get('/admin/slider-post', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/slider-posts.html");
})
app.get('/admin/admins', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/admins.html");
})
app.get('/admin/new-admin', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/new-admin.html");
})
app.get('/admin/new-sub-category', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/add-sub-category.html");
})
app.get('/admin/sub-cats', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/sub-categories.html");
})
app.get('/admin/edit-sub-catergory', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/edit-sub-catergory.html");
})

/// admin jss ///
app.get('/admin-js/edit-cat-popup', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/js/edit-cat-popup.js");
})
app.get('/admin-js/edit-user-popup', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/js/edit-user-popup.js");
})
app.get('/admin-js/logged-in-admin-info', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/js/logged-in-admin-info.js");
})
app.get('/admin-js/logout', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/js/logout.js");
})
app.get('/admin-js/add-category', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/js/add-category.js");
})
app.get('/admin-js/add-post', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/js/add-post.js");
})
app.get('/admin-js/get-users', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/js/get-users.js");
})
app.get('/admin-js/mobile-header', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/js/mobile-header.js");
})
app.get('/admin-js/left-menu', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/js/left-menu.js");
})

/// admin images ///
app.get('/admin/test-image', (req, res) => {
	res.sendFile(__dirname + "/public/admin/images/test.jpg")
})
/// admin icons ///
app.get('/admin/edit-icon', (req, res) => {
	res.sendFile(__dirname + "/public/admin/icons/edit.png")
})
app.get('/admin/delete-icon', (req, res) => {
	res.sendFile(__dirname + "/public/admin/icons/bin.png")
})
app.get('/admin/home-icon', (req, res) => {
	res.sendFile(__dirname + "/public/admin/icons/home.png")
})
app.get('/admin/user-icon', (req, res) => {
	res.sendFile(__dirname + "/public/admin/icons/user.svg")
})
app.get('/admin/calendar-icon', (req, res) => {
	res.sendFile(__dirname + "/public/admin/icons/calendar.svg")
})
app.get('/admin/cubes-icon', (req, res) => {
	res.sendFile(__dirname + "/public/admin/icons/cubes.svg")
})
app.get('/admin/add-new-icon', (req, res) => {
	res.sendFile(__dirname + "/public/admin/icons/plus-square.svg")
})
app.get('/admin/login-icon', (req, res) => {
	res.sendFile(__dirname + "/public/admin/icons/login.svg")
})
app.get('/admin/noimg-icon', (req, res) => {
	res.sendFile(__dirname + "/public/admin/images/noimg.png")
})
app.get('/admin/circle-plus-icon', (req, res) => {
	res.sendFile(__dirname + "/public/admin/icons/more.png")
})
app.get('/admin/edit-svg', (req, res) => {
	res.sendFile(__dirname + "/public/admin/icons/edit.svg")
})
app.get('/admin/leo-test', (req, res) => {
	res.sendFile(__dirname + "/public/admin/images/leo-test.jpg")
})
app.get('/admin/eye-icon', (req, res) => {
	res.sendFile(__dirname + "/public/admin/icons/eye.svg")
})
/// upload images ///
app.post('/post-img', (req, res) => {
	if(req.files){
		var file = req.files.fileToUpload,
			filename = file.name;

		file.mv('./images/posts/' + filename, function(error){
			if(error){
				res.json({ error });
			} else {
				res.redirect('http://localhost:3000/admin/posts');
			}
		})
	} else {
		res.redirect('http://localhost:3000/admin/posts');
	}
})
app.post('/slider-img', (req, res) => {
	if(req.files){
		var file = req.files.fileToUpload,
			filename = file.name;

		file.mv('./images/posts/' + filename, function(error){
			if(error){
				res.json({ error });
			} else {
				res.redirect('http://localhost:3000/admin/slider-posts');
			}
		})
	} else {
		res.redirect('http://localhost:3000/admin/slider-posts');
	}
})

////////////////////////
/// client side urls ///
///////////////////////
/// client side css ///
app.get('/css', (req, res) => {
	res.sendFile(__dirname + "/public/user/css/style.css");
})
/// client side front routes ///
app.get('/', (req, res) => {
	res.sendFile(__dirname + "/public/user/index.html");
})
app.get('/post', (req, res) => {
	res.sendFile(__dirname + "/public/user/post.html");
})
app.get('/category', (req, res) => {
	res.sendFile(__dirname + "/public/user/category.html");
})

/// client side js files ///
app.get('/user-header-js', (req, res) => {
	res.sendFile(__dirname + "/public/user/js/user-header.js");
})
app.get('/user-footer-js', (req, res) => {
	res.sendFile(__dirname + "/public/user/js/user-footer.js");
})

/// client side images ///
app.get('/client/facebook-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/facebook.svg");
})
app.get('/client/facebook-icon-color', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/fb-color.png");
})
app.get('/client/twitter-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/twitter.svg");
})
app.get('/client/twitter-icon-color', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/twitter-png.png");
})
app.get('/client/insta-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/instagram.svg");
})
app.get('/client/clock-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/clock.svg");
})
app.get('/client/calendar-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/calendar-alt.svg");
})
app.get('/client/comment-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/comment.svg");
})
app.get('/client/user-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/user.svg");
})
app.get('/client/down-arrow-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/angle-down.svg");
})
app.get('/client/right-arrow-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/angle-right.svg");
})
app.get('/client/phone-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/phone.svg");
})
app.get('/client/login-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/login.svg");
})
app.get('/client/search-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/search.svg");
})
app.get('/client/hamb-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/hamb.png");
})
app.get('/client/close-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/close_icon.png");
})
app.get('/client/eye-icon', (req, res) => {
	res.sendFile(__dirname + "/public/user/icons/eye.svg");
})
app.get('/client/test-img', (req, res) => {
	res.sendFile(__dirname + "/public/user/images/test-img.jpg");
})
app.get('/client/test-img2', (req, res) => {
	res.sendFile(__dirname + "/public/user/images/test-img2.jpg");
})
app.get('/client/test-img3', (req, res) => {
	res.sendFile(__dirname + "/public/user/images/test-img3.jpg");
})
app.get('/client/test-img4', (req, res) => {
	res.sendFile(__dirname + "/public/user/images/test-img4.jpg");
})
app.get('/client/test-img5', (req, res) => {
	res.sendFile(__dirname + "/public/user/images/test-img5.jpg");
})

app.use(mainRouter);

const port = process.env.PORT || 5000;
// const hostname = '199.188.204.226';
const server = app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});