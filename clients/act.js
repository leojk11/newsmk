const con = require('../DB/db');
const jwt = require('jsonwebtoken');

/// get ///
getAllCategories = async(req, res) => {
    getAllCategoriesQuery = () => {
        const query = 'SELECT * FROM categories';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const categories = await getAllCategoriesQuery();
        console.log(categories);
        res.status(200).json({ categories });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}
getLastPosts = async(req, res) => {
    getLastThreePostsQuery = () => {
        const query = 'SELECT * FROM posts ORDER BY ID DESC LIMIT 5';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    try {
        const lastPosts = await getLastThreePostsQuery();
        res.status(200).json({ lastPosts });
    } catch (error) {
        res.status(500).send(error);
    }
}

getAllMagasinePosts = async(req, res) => {
    getAllMagasinePostsQuery = () => {
        const query = 'SELECT * FROM posts WHERE category_id = 8 ORDER BY ID DESC LIMIT 3';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    try {
        const magasinePosts = await getAllMagasinePostsQuery();
        res.status(200).json({ magasinePosts });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
getAllMacedoniaPosts = async(req, res) => {

    getAllMacedoniaPostsQuery = () => {
        const query = 'SELECT * FROM posts WHERE category_id = 2 ORDER BY ID DESC LIMIT 3';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error);
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const categoryPosts = await getAllMacedoniaPostsQuery();
        res.status(200).json({ categoryPosts });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
getAllWorldPosts = async(req, res) => {

    getAllWorldPostsQuery = () => {
        const query = 'SELECT * FROM posts WHERE category_id = 6 ORDER BY ID DESC LIMIT 3';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error);
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const categoryPosts = await getAllWorldPostsQuery();
        res.status(200).json({ categoryPosts });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
getAllSportPosts = async(req, res) => {

    getAllSportPostsQuery = () => {
        const query = 'SELECT * FROM posts WHERE category_id = 7 ORDER BY ID DESC LIMIT 3';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error);
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const categoryPosts = await getAllSportPostsQuery();
        res.status(200).json({ categoryPosts });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
getAllSmallSportPosts = async(req, res) => {

    getAllSportPostsQuery = () => {
        const query = 'SELECT * FROM posts WHERE category_id = 7 ORDER BY ID DESC LIMIT 10';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error);
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const categoryPosts = await getAllSportPostsQuery();
        res.status(200).json({ categoryPosts });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
getAllPartyPosts = async(req, res) => {

    getAllSportPostsQuery = () => {
        const query = 'SELECT * FROM posts WHERE category_id = 9 ORDER BY ID DESC LIMIT 3';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error);
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const categoryPosts = await getAllSportPostsQuery();
        res.status(200).json({ categoryPosts });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

getSinglePost = async(req, res) => {
    const postId = req.query.postId;
    console.log(postId)

    getSinglePostQuery = (postId) => {
        const query = 'SELECT * FROM posts WHERE ID = ?';
        return new Promise((res, rej) => {
            con.query(query, [postId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const singlePost = await getSinglePostQuery(postId);
        res.status(200).json({ singlePost });
    } catch (error) {
        res.status(500).json({ error: error });
    }
    
}


getAllSliderPosts = async(req, res) => {
    getAllSliderPostsQuery = () => {
        const query = 'SELECT * FROM slider_posts';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error);
                } else {
                    res(results)
                }
            })
        })
    }
    try {
        const sliderPosts = await getAllSliderPostsQuery();
        res.status(200).json({ sliderPosts });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

getThreeRandomPosts = async(req, res) => {
    getRandomPostsQuery = () => {
        const query = 'SELECT * FROM posts ORDER BY RAND() LIMIT 3';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    try {
        const sliderPosts = await getRandomPostsQuery();
        res.status(200).json({ sliderPosts });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

getCommentsForSinglePost = async(req, res) => {
    const postId = req.query.postId;

    getCommForSinglePostsQuery = (postId) => {
        const query = 'SELECT * FROM comments WHERE post_id = ?';
        return new Promise((res, rej) => {
            con.query(query, [postId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const postComments = await getCommForSinglePostsQuery(postId);
        res.status(200).json({ postComments });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
getOneBigPost = async(req, res) => {

    getBigPostQuery = () => {
        const query = 'SELECT * FROM posts WHERE primary_post = 1';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const bigPost = await getBigPostQuery();
        res.status(200).json({ bigPost });
    } catch (error) {
        res.status(500).json({ error });
    }
}

firstTwoPostsFromToday = async(req, res) => {

    firstTwoPostsQuery = () => {
        const query = 'SELECT * FROM posts WHERE date_posted = CURRENT_DATE() LIMIT 2';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error) {
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const posts = await firstTwoPostsQuery();
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ error });
    }
}

getRandomPosts = async(req, res) => {

    getRandomPostsQuery = () => {
        const query = 'SELECT * FROM posts ORDER BY RAND() LIMIT 6';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const posts = await getRandomPostsQuery();
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ error });
    }
}

getAllPostFromSingleCategory = async(req, res) => {
    const catId = req.query.id;

    getPostsQuery = (catId) => {
        const query = 'SELECT * FROM posts WHERE category_id = ? ORDER BY ID DESC LIMIT 3';
        return new Promise((res, rej) => {
            con.query(query, [catId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results);
                }
            })
        })
    }

    try {
        const posts = await getPostsQuery(catId);
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ error })
    }
}
getPostsByViews = async(req, res) => {

    getPostByViewsQuery = () => {
        const query = 'SELECT * FROM posts ORDER BY views DESC LIMIT 3';
        return new Promise((res, rej) => {
            con.query(query, (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const posts = await getPostByViewsQuery();
        res.status(200).json({ posts });
    } catch(error) {
        res.status(500).json({ error });
    }
}
getPostWithMostViewsFromCategory = async(req, res) => {
    const catId = req.query.catId;

    postWithMostViewsQuery = (catId) => {
        const query = 'SELECT * FROM posts WHERE category_id = ? ORDER BY views DESC LIMIT 1';
        return new Promise((res, rej) => {
            con.query(query, [catId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const post = await postWithMostViewsQuery(catId);
        res.status(200).json({ post });
    } catch(error) {
        res.status(500).json({ error });
    }
}
getSubCatFromCategory = async(req, res) => {
    const catId = req.query.catId;

    getSubCatsQuery = (catId) => {
        const query = 'SELECT * FROM sub_cats WHERE category_id = ?';
        return new Promise((res, rej) => {
            con.query(query, [catId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const subCats = await getSubCatsQuery(catId);
        res.status(200).json({ subCats });
    } catch(error){
        res.status(500).json({ error })
    }
}
getAllSubCatPosts = async(req, res) => {
    const subCatId = req.query.subCatId;

    getAllSubCatPosts = (subCatId) => {
        const query = 'SELECT * FROM posts WHERE sub_cat_id = ?';
        return new Promise((res, rej) => {
            con.query(query, [subCatId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const subCatPosts = await getAllSubCatPosts(subCatId);
        res.status(200).json({ subCatPosts });
    } catch(error){
        res.status(500).json({ error })
    }
}
getLastFourSubCatPosts = async(req, res) => {
    const id = req.query.id;

    getFourPostsQuery = (id) => {
        const query = 'SELECT * FROM posts WHERE sub_cat_id = ? ORDER BY ID DESC LIMIT 4';
        return new Promise((res, rej) => {
            con.query(query, [id], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const subPosts = await getFourPostsQuery(id);
        res.status(200).json({ subPosts });
    } catch(error){
        res.status(500).json({ error });
    }
}
getBigPostForSubCat = async(req, res) => {
    const subCatId = req.query.subCatId;

    getOnePostQuery = (subCatId) => {
        const query = 'SELECT * FROM posts WHERE sub_cat_id = ? ORDER BY RAND() LIMIT 1';
        return new Promise((res, rej) => {
            con.query(query, [subCatId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const randPost = await getOnePostQuery(subCatId);
        res.status(200).json({ randPost });
    } catch(error){
        res.status(500).json({ error })
    }
}
getFourFromSubCat = async(req, res) => {
    const subId = req.query.id;

    getFirstTwoQuery = (id) => {
        const query = 'SELECT * FROM posts WHERE sub_cat_id = ? AND date_posted = CURRENT_DATE() LIMIT 2';
        return new Promise((res, rej) => {
            con.query(query, [id], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    getLastTwoQuery = (id) => {
        const query = 'SELECT * FROM posts WHERE sub_cat_id = ? AND date_posted = CURRENT_DATE() ORDER BY ID DESC LIMIT 2';
        return new Promise((res, rej) => {
            con.query(query, [id], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        const firstTwo = await getFirstTwoQuery(subId);
        const lastTwo = await getLastTwoQuery(subId);
        res.status(200).json({ firstTwo, lastTwo });
    } catch(error) {
        res.status(500).json({ error });
    }
}

/// post ///
addComment = async(req, res) => {
    const data = {
        userName: req.body.name,
        text: req.body.text,
        postId: req.query.postId
    }
    console.log(data);

    addNewCommentQuery = (data) => {
        const query = 'INSERT INTO comments(text, user_name, date_posted, time_posted, post_id) VALUES(?,?,CURRENT_DATE(), CURRENT_TIME(),?)';
        return new Promise((res, rej) => {
            con.query(query, [data.text, data.userName, data.postId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        await addNewCommentQuery(data);
        res.status(200).json({ message: 'comment added' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

/// patch ///
countPostViews = async(req, res) => {
    const postId = req.query.postId;

    updatePostViewsQuery = (postId) => {
        const query = 'UPDATE posts SET views = views + 1 WHERE ID = ?';
        return new Promise((res, rej) => {
            con.query(query, [postId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        await updatePostViewsQuery(postId);
        res.status(200).json({ mess: 'views +1' });
    } catch(error) {
        res.status(500).json({ error });
    }
}
module.exports = {
    /// get ///
    getAllCategories,
    getLastPosts,
    getAllMagasinePosts,
    getAllSliderPosts,
    getThreeRandomPosts,
    getAllMacedoniaPosts,
    getAllWorldPosts,
    getAllSportPosts,
    getAllSmallSportPosts,
    getAllPartyPosts,
    getSinglePost,
    getCommentsForSinglePost,
    getOneBigPost,
    firstTwoPostsFromToday,
    getRandomPosts,
    getAllPostFromSingleCategory,
    getPostsByViews,
    getPostWithMostViewsFromCategory,
    getSubCatFromCategory,
    getAllSubCatPosts,
    getBigPostForSubCat,
    getLastFourSubCatPosts,
    getFourFromSubCat,

    /// post ///
    addComment,

    /// patch ///
    countPostViews
}