const express = require('express');
const middlewares = require('../middlewares/middlewares');
const actions = require('./act');

const router = express.Router();

/// get ///
router.get('/all-admins', actions.getAllAdmins);
router.get('/categories', middlewares.verifyTokenAdmin, actions.getAllCategories);
router.get('/single-cat', middlewares.verifyTokenAdmin, actions.getSingleCategory);
router.get('/single-cat-edit', middlewares.verifyTokenAdmin, actions.getSingleCategoryByName);
router.get('/posts', middlewares.verifyTokenAdmin, actions.getAllPosts);
router.get('/single-post', middlewares.verifyTokenAdmin, actions.getSinglePost);
router.get('/users', middlewares.verifyTokenAdmin, actions.getAllUsers);
router.get('/single-user', middlewares.verifyTokenAdmin, actions.getSingleUser);
router.get('/search-users', middlewares.verifyTokenAdmin, actions.seachUsers);
router.get('/slider-posts', middlewares.verifyTokenAdmin, actions.getAllSliderPosts);
router.get('/sub-cats', middlewares.verifyTokenAdmin, actions.getAllSubCategories);

/// post ///
router.post('/new-post', middlewares.verifyTokenAdmin, actions.addNewPost);
router.post('/new-slider-post', middlewares.verifyTokenAdmin, actions.addNewSliderPost);
router.post('/new-cat', middlewares.verifyTokenAdmin, actions.addNewCategory);
router.post('/new-user', middlewares.verifyTokenAdmin, actions.addNewUser);
router.post('/new-admin', middlewares.verifyTokenAdmin, actions.addNewAdmin);
router.post('/new-sub-cat', middlewares.verifyTokenAdmin, actions.addNewSubCategory)

/// patch ///
router.patch('/edit-cat', middlewares.verifyTokenAdmin, actions.editCategory);
router.patch('/edit-user', middlewares.verifyTokenAdmin, actions.editUser);
router.patch('/edit-post', middlewares.verifyTokenAdmin, actions.editPost);
router.patch('/make-primary', actions.makePostPrimary);

/// delete ///
router.delete('/delete-cat', middlewares.verifyTokenAdmin, actions.deleteCategory);
router.delete('/delete-post', middlewares.verifyTokenAdmin, actions.deletePost);
router.delete('/delete-slider-post', middlewares.verifyTokenAdmin, actions.deleteSliderPost);

/// login, logout ///
router.post('/login', actions.adminLogin);
router.get('/logout', actions.adminLogout);
router.get('/admin-info', middlewares.verifyTokenAdmin, actions.getLoggedInAdminInfo);

module.exports = router;