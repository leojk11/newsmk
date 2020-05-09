const express = require('express');
const middlewares = require('../middlewares/middlewares');
const actions = require('./act');

const router = express.Router();

/// get ///
// router.get('/users', middlewares.verifyTokenAdmin, actions.getAllAdmins);
router.get('/categories', middlewares.verifyTokenAdmin, actions.getAllCategories);
router.get('/single-cat', middlewares.verifyTokenAdmin, actions.getSingleCategory);
router.get('/posts', middlewares.verifyTokenAdmin, actions.getAllPosts);
router.get('/users', middlewares.verifyTokenAdmin, actions.getAllUsers);

/// post ///
router.post('/new-post', middlewares.verifyTokenAdmin, actions.addNewPost);
router.post('/new-cat', middlewares.verifyTokenAdmin, actions.addNewCategory);
router.post('/new-user', middlewares.verifyTokenAdmin, actions.addNewUser);

/// patch ///
router.patch('/edit-cat', middlewares.verifyTokenAdmin, actions.editCategory);

/// delete ///
router.delete('/delete-cat', middlewares.verifyTokenAdmin, actions.deleteCategory);
router.delete('/delete-post', middlewares.verifyTokenAdmin, actions.deletePost);

/// login, logout ///
router.post('/login', actions.adminLogin);
router.get('/logout', actions.adminLogout);

module.exports = router;