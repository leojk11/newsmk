const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
require('dotenv/config');
const middlewares = require('./middlewares/middlewares')


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.get(express.static(__dirname + "/public"));


/// admin ///


module.exports = app;