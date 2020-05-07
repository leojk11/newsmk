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



/// admin css /// .webp
app.get('/admin/css', (req, res) => {
	res.sendFile(__dirname + "/public/admin/css/style.css");
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
app.get('/admin/categories', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/categories.html");
})
app.get('/admin/new-category', middlewares.verifyTokenAdmin, (req, res) => {
	res.sendFile(__dirname + "/public/admin/add-category.html");
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


app.use(mainRouter);

const port = process.env.PORT || 5000;
// const hostname = '199.188.204.226';
const server = app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});