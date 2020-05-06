const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
require('dotenv/config');
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
	res.sendFile(__dirname + "/public/admin/css/style.css")
})
/// admin public routes ///
app.get('/admin/dashboard', (req, res) => {
	res.sendFile(__dirname + "/public/admin/index.html")
})
app.get('/admin/user-activity', (req, res) => {
	res.sendFile(__dirname + "/public/admin/user-activity.html")
})
app.get('/admin/posts', (req, res) => {
	res.sendFile(__dirname + "/public/admin/manage-posts.html")
})
app.get('/admin/categories', (req, res) => {
	res.sendFile(__dirname + "/public/admin/categories.html")
})




const port = process.env.PORT || 5000;
// const hostname = '199.188.204.226';
const server = app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});