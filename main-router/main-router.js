const express = require('express');
const adminRouter = require('../admin/routes');

const mainRouter = express();

mainRouter.use('/admin', adminRouter);

module.exports = mainRouter;
