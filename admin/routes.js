const express = require('express');
const middlewares = require('../middlewares/middlewares');
const actions = require('./act');

const router = express.Router();

// routes
router.get('/users', middlewares.verifyTokenAdmin, actions.getAllAdmins);


router.post('/login', actions.adminLogin);
router.get('/logout', actions.adminLogout);

module.exports = router;