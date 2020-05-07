const express = require('express');
const adminRouter = require('../admin/routes');

const mainRouter = express();

mainRouter.use('/admins', adminRouter);

module.exports = mainRouter;
