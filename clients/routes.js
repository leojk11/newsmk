const express = require('express');
const middlewares = require('../middlewares/middlewares');
const actions = require('./act');

const router = express.Router();

/// get /// 
router.get('/all-categories', actions.getAllCategories);
router.get('/last-posts', actions.getLastPosts);
router.get('/magasine-posts', actions.getAllMagasinePosts);
router.get('/slider-posts', actions.getThreeRandomPosts);
router.get('/mk-posts', actions.getAllMacedoniaPosts);
router.get('/w-posts', actions.getAllWorldPosts);
router.get('/s-posts', actions.getAllSportPosts);
router.get('/s-s-posts', actions.getAllSmallSportPosts);
router.get('/p-posts', actions.getAllPartyPosts);
router.get('/post', actions.getSinglePost);
router.get('/post-comments', actions.getCommentsForSinglePost);
router.get('/big-post', actions.getOneBigPost);
router.get('/two-posts', actions.firstTwoPostsFromToday);
router.get('/random-posts', actions.getRandomPosts);
router.get('/cat-posts', actions.getAllPostFromSingleCategory);

/// post ///
router.post('/add-comment', actions.addComment);

module.exports = router;