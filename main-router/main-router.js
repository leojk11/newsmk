const express = require('express');
const adminRouter = require('../admin/routes');
const usersRouter = require('../clients/routes');

const mainRouter = express();

mainRouter.use('/admins', adminRouter);
mainRouter.use('/users', usersRouter);

module.exports = mainRouter;
