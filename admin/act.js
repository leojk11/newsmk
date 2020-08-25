const con = require('../DB/db');
const jwt = require('jsonwebtoken');

// admin login
adminLogin = async (req, res) => {
    const username = req.body.user;
    const password = req.body.pass;

    getAdminUsernamesQuery = () => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM admin_users', (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };

    const adminUsernames = await getAdminUsernamesQuery();
    const adminExists = adminUsernames.some(admin => {
        return username == admin.username
    });

    if (username == '') {
        res.status(200).json({ message: 'username missing' });
    } else if (password == '') {
        res.status(200).json({ message: 'pass missing' });
    } else if (adminExists == false) {
        res.status(200).json({ message: 'wrong username' });
    }
    try {
        ademinLoginQuery = (username) => {
            return new Promise((res, rej) => {
                con.query('SELECT * FROM admin_users WHERE username = ?', [username], (error, results, fields) => {
                    if(error){
                        rej(error)
                    } else {
                        res(results)
                    }
                })
            })
        };

        const admin = await ademinLoginQuery(username);
        const adminId = admin[0].ID;
        const matchPassword = admin.some(admin => {
            return password == admin.password
        });

        if (matchPassword == true) {
            const payload = { adminId: adminId };

            const token = jwt.sign(payload, process.env.SECRET);
            res.cookie('admin_token', token, {
                maxAge: 3600000,
                httpOnly: true
            });

            res.status(200).json({ message: 'logged in', token });
        } else {
            res.status(200).json({ message: 'incorrect pass' });
        };
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    };
};
adminLogout = async(req, res) => {
    res.clearCookie('admin_token');

    try {
        res.status(200).json({ message: 'logged out' });
    } catch (error) {
        res.status(200).json({ error });
    }
}
getLoggedInAdminInfo = async(req, res) => {
    const loggedInUser = req.admin.adminId;

    getSingleAdminQuery = (adminId) => {
        const query = 'SELECT * FROM admin_users WHERE ID = ?';
        return new Promise((res, rej) => {
            con.query(query, [adminId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            }) 
        })
    }

    try {
        const admin = await getSingleAdminQuery(loggedInUser);
        res.status(200).json({ admin });
    } catch (error) {
        res.status(500).json({ error });
    }
}


/// get ///
getAllAdmins = async(req, res) => {
    getAllAdminsQuery = () => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM admin_users', (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    const admins = await getAllAdminsQuery();
    try {
        res.status(200).json({ admins });
    } catch (error) {
        res.status(500).json({ error });
    }
}
getAllUsers = async(req, res) => {
    getAllUsersQuery = () => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM users', (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    const users = await getAllUsersQuery();
    const usersNumb = users.length;

    getTodayNewUsersQuery = () => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM users WHERE date_registered = CURRENT_DATE()', (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    const todayUsers = await getTodayNewUsersQuery();
    const todayUsersNumb = todayUsers.length;

    try {
        res.status(200).json({ users, usersNumb, todayUsers, todayUsersNumb });
    } catch (error) {
        res.status(500).json({ error });
    }
}
seachUsers = async(req, res) => {
    const info = req.query.info;

    searchUsersQuery = (info) => {
        return new Promise((res, rej) => {
            con.query("SELECT * FROM users WHERE firstname LIKE CONCAT('%', ?, '%') OR lastname LIKE CONCAT('%', ?, '%') OR date_registered LIKE CONCAT('%', ?, '%')", [info, info, info], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    const users = await searchUsersQuery(info);

    try {
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error });
    }
}
getSingleUser = async(req, res) => {
    const userId = req.query.userId;

    singleUserQuery = (id) => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM users WHERE ID = ?', [id],(error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results);
                }
            })
        })
    }
    const user = await singleUserQuery(userId);

    try {
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error });
    }
}
getAllCategories = async(req, res) => {
    getAllCategoriesQuery = () => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM categories', (error, results, fields) => {
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
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ error });
    }
}
getSingleCategory = async(req, res) => {
    const catId = req.query.catId;

    getCategoryQuery = (catId) => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM categories WHERE ID = ?', [catId], (error, results, fields) => {
                if(error){
                    rej(error);
                } else {
                    res(results);
                }
            })
        })
    }   

    const category = await getCategoryQuery(catId);
    console.log(category);
    try {
        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ error });
    }
}
getSingleCategoryByName = async(req, res) => {
    const info = req.query.info;

    getAllCategoriesQuery = () => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM categories', (error, results, fields) => {
                if(error){
                    rej(error);
                } else {
                    res(results);
                }
            })
        })
    }
    const categories = await getAllCategoriesQuery();
    const catExists = categories.some(cat => {
        return info == cat.name
    })

    if(catExists == false){
        res.status(200).json({ message: 'not exist' });
    } else {
        getCategoryByNameQuery = (info) => {
            return new Promise((res, rej) => {
                con.query('SELECT * FROM categories WHERE name = ?', [info], (error, results, fields) => {
                    if(error){
                        rej(error);
                    } else {
                        res(results);
                    }
                })
            })
        }
    
        const category = await getCategoryByNameQuery(info);
    
        try {
            res.status(200).json({ category });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}
getAllPosts = async(req, res) => {
    allPostsQuery = () => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM posts', (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    const posts = await allPostsQuery();
    const overallPostsNumb = posts.length;

    getOnlyTodayPostsQuery = () => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM posts WHERE date_posted = CURRENT_DATE()', (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    const todayPosts = await getOnlyTodayPostsQuery();
    const todayPostsNumb = todayPosts.length;

    try {
        res.status(200).json({ posts, overallPostsNumb, todayPosts, todayPostsNumb });
    } catch (error) {
        res.status(500).json({ error });
    }
}
getSinglePost = async(req, res) => {
    const postId = req.query.postId;

    getSinglePostQuery = (postId) => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM posts WHERE ID = ?', [postId], (error, results, fields) => {
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
        res.status(500).json({ error });
    }
}
getAllSliderPosts = async(req, res) => {
    getAllSliderPosts = () => {
        const query = 'SELECT * FROM slider_posts';
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
        const sliderPosts = await getAllSliderPosts();
        res.status(200).json({ sliderPosts });
    } catch (error) {
        res.status(500).json({ error });
    }
}
getAllSubCategories = async(req, res) => {

    getAllSubCatsQuery = () => {
        const query = 'SELECT * FROM sub_cats';
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
        const subCats = await getAllSubCatsQuery();
        res.status(200).json({ subCats });
    } catch(error){
        res.status(200).json({ error });
    }
}



/// post requests ///
addNewPost = async(req, res) => {
    const adminId = req.admin.adminId;

    getOneAdminQuery = (adminId) => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM admin_users WHERE ID = ?', [adminId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };

    const user = await getOneAdminQuery(adminId);
    const userFullName = user[0].firstname + ' ' + user[0].lastname;

    if(req.body.title == ''){
        res.status(200).json({ message: 'title missing' })
    } else if (req.body.text == ''){
        res.status(200).json({ message: 'text missing' })
    } else if (req.body.image == 'undefined'){
        res.status(200).json({ message: 'image missing' })
    }

    const data = {
        title: req.body.title,
        text: req.body.text,
        category: req.body.category,
        subCat: req.body.subCat,
        image: req.body.image,
        writer: userFullName,
        views: 0,
        source: req.body.source,
        smallTitle: req.body.smallTitle
    };
    console.log(data);

    getCategoryQuery = (catName) => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM categories WHERE name = ?', [catName], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    const singleCat = await getCategoryQuery(req.body.category);
    const catId = singleCat[0].ID;

    data.catId = catId;

    getSubCategoryIdQuery = (subCat) => {
        const query = 'SELECT * FROM sub_cats WHERE sub_cat = ?';
        return new Promise((res, rej) => {
            con.query(query, [subCat], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results);
                }
            })
        })
    }
    const subCat = await getSubCategoryIdQuery(req.body.subCat);
    const subCatId = subCat[0].ID;

    data.subCatId = subCatId;

    addNewPostQuery = (data) => {
        return new Promise((res, rej) => {
            con.query('INSERT INTO posts(title, text, image, writer, views, date_posted, time_posted, category, category_id, sub_cat, sub_cat_id, source, small_title) VALUES(?,?,?,?,?,CURRENT_DATE,CURRENT_TIMESTAMP(),?,?,?,?,?,?)', [data.title, data.text, data.image, data.writer, data.views, data.category, data.catId, data.subCat, data.subCatId, data.source, data.smallTitle], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            });
        })
    };


    try {
        await addNewPostQuery(data);
        res.status(200).json({ message: 'post added' });
    } catch (error) {
        res.status(500).json({ error });
    }
}
addNewSliderPost = async(req, res) => {
    const adminId = req.admin.adminId;

    getOneAdminQuery = (adminId) => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM admin_users WHERE ID = ?', [adminId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    };

    const admin = await getOneAdminQuery(adminId);
    const adminName = admin[0].firstname + ' ' + admin[0].lastname;

    const data = {
        title: req.body.title,
        image: req.body.image,
        writer: adminName,
        category: req.body.category,
    }

    getCategoryQuery = (catName) => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM categories WHERE name = ?', [catName], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    const singleCat = await getCategoryQuery(req.body.category);
    const catId = singleCat[0].ID;

    data.catId = catId;

    addNewSliderPostQuery = (data) => {
        return new Promise((res, rej) => {
            con.query('INSERT INTO slider_posts(title, image, writer, date_posted, time_posted, category, category_id) VALUES(?,?,?,CURRENT_DATE(),CURRENT_TIME(),?,?)', [data.title, data.image, data.writer, data.category, data.catId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        // console.log(data)
        await addNewSliderPostQuery(data);
        res.status(200).json({ message: 'post added' });
    } catch (error) {
        res.status(500).json({ error });
    }
}
addNewCategory = async(req, res) => {
    const data = {
        title: req.body.title
    };
    console.log(data);

    addNewCategoryQuery = (data) => {
        return new Promise((res, rej) => {
            con.query('INSERT INTO categories(name, position, views, posts, date_added, time_added) VALUES(?,0,0,0,CURRENT_DATE(), CURRENT_TIME())', [data.title], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        await addNewCategoryQuery(data);
        res.status(200).json({ message: 'cat added' });
    } catch (error) {
        res.status(500).json({ error });
    }
}
addNewSubCategory = async(req, res) => {
    const subCatObj = {
        category: req.body.category,
        subCat: req.body.sub_cat
    }

    getSingleCatIdQuery = (category) => {
        const query = 'SELECT * FROM categories WHERE name = ?';
        return new Promise((res, rej) => {
            con.query(query, [category], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    const category = await getSingleCatIdQuery(subCatObj.category);
    const catId = category[0].ID;

    addNewSubCatQuery = (subCatObj, catId) => {
        const query = 'INSERT INTO sub_cats(sub_cat, category, category_id) VALUES(?,?,?)';
        return new Promise((res, rej) => {
            con.query(query, [subCatObj.subCat, subCatObj.category, catId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        await addNewSubCatQuery(subCatObj, catId);
        res.status(200).json({ mess: 'sub cat added' });
    } catch(error) {
        res.status(500).json({ error });
    }
}
addNewUser = async(req, res) => {
    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    addNewUserQuery = (data) => {
        return new Promise((res, rej) => {
            con.query('INSERT INTO users(firstname, lastname, email, username, password, date_registered) VALUES(?,?,?,?,?,CURRENT_DATE())', [data.firstname, data.lastname, data.email, data.username, data.password], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    try {
        await addNewUserQuery(data);
        res.status(200).json({ message: 'user added' });
    } catch (error) {
        res.status(500).json({ error });
    }
}
addNewAdmin = async(req, res) => {
    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        status: 'offline',
        image: 'new-admin.jpg',
        adminRole: req.body.role
    }
    console.log(data);

    addNewAdminQuery = (data) => {
        const query = "INSERT INTO admin_users(firstname, lastname, email, username, password, status, image, admin_role, date_added) VALUES(?,?,?,?,?,?,?,?,CURRENT_DATE())";
        return new Promise((res, rej) => {
            con.query(query, [data.firstname, data.lastname, data.email, data.username, data.password, data.status, data.image, data.adminRole], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        await addNewAdminQuery(data);
        res.status(200).json({ messae: 'admin added' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/// patch ///
editCategory = async(req, res) => {
    const catId = req.query.catId;
    const data = {
        name: req.body.name
    }

    getCategoryQuery = (catId) => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM categories WHERE ID = ?', [catId], (error, results, fields) => {
                if(error){
                    rej(error);
                } else {
                    res(results);
                }
            })
        })
    }   
    const category = await getCategoryQuery(catId);

    const editCategory = category.filter(cat => {
        if(data.name == ''){
            data.name = cat.name
        } else {
            cat.name = data.name
        }

        return cat;
    })

    const final = editCategory[0];

    editCategoryQuery = (final, catId) => {
        return new Promise((res, rej) => {
            con.query('UPDATE categories SET name = ? WHERE ID = ?', [final.name, catId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    try {
        await editCategoryQuery(final, catId);
        res.status(200).json({ message: 'cat edited' });
    } catch (error) {
        res.status(500).json({ error });
    }
}
editUser = async(req, res) => {
    const userId = req.query.userId;
    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    getSingleUserQuery = (userId) => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM users WHERE ID = ?', [userId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }
    const user = await getSingleUserQuery(userId);
    const editUser = user.filter(user => {
        if(data.firstname == ''){
            data.firstname = user.firstname
        } else {
            user.firstname= data.firstname
        }

        if(data.lastname == ''){
            data.lastname = user.lastname
        } else {
            user.lastname = data.lastname
        }

        if(data.email == ''){
            data.email = user.email
        } else {
            user.email = data.email
        }

        if(data.username == ''){
            data.username = user.username
        } else {
            user.username = data.username
        }

        if(data.password == ''){
            data.password = user.passwrod
        } else {
            user.password = data.password
        }

        return user;
    })

    const final = editUser[0];

    updateUserInfo = (final, userId) => {
        return new Promise((res, rej) => {
            con.query('UPDATE users SET firstname = ?, lastname = ?, username = ?, email = ?, password = ? WHERE ID = ?', [final.firstname, final.lastname, final.username, final.email, final.password, userId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    await updateUserInfo(final, userId);

    try {
        res.status(200).json({ message: 'user edited' });
    } catch (error) {
        res.status(500).json({ error });
    }
}
editPost = async(req, res) => {
    const postId = req.query.postId;
    const postData = {
        title: req.body.title,
        text: req.body.text,
        category: req.body.category,
        image: req.body.image,
        smallTitle: req.body.smallTitle,
        source: req.body.source,
        subCat: req.body.subCat
    }
    console.log(postData);

    getSinglePostQuery = (postId) => {
        return new Promise((res, rej) => {
            con.query('SELECT * FROM posts WHERE ID = ?', [postId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    const post = await getSinglePostQuery(postId);
    const editPost = post.filter(post => {
        if(postData.title == ''){
            postData.title = post.title
        } else {
            post.title = postData.title
        }

        if(postData.text == ''){
            postData.text = post.text
        } else {
            post.text = postData.text
        }

        if(postData.category == ''){
            postData.category = post.data
        } else {
            post.data = postData.category
        }

        if(postData.image == undefined){
            postData.image = post.image
        } else {
            post.image = postData.image
        }

        if(postData.source == ''){
            postData.source = post.source
        } else {
            post.source = postData.source
        }

        if(postData.smallTitle == '') {
            postData.smallTitle = post.smallTitle
        } else {
            post.smallTitle = postData.smallTitle
        }

        return post;
    })

    const finalResults = editPost[0];

    editPostQuery = (data, postId) => {
        const query = 'UPDATE posts SET title = ?, text = ?, category = ?, image = ?, small_title = ?, source = ?, sub_cat = ? WHERE ID = ?';
        return new Promise((res, rej) => {
            con.query(query, [data.title, data.text, data.category, data.image, data.smallTitle, data.source, data.subCat, postId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }


    try {
        await editPostQuery(finalResults, postId);
        res.status(200).json({ message: 'post edited' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

makePostPrimary = async(req, res) => {
    const postId = req.query.postId;

    makePrimaryPostQuery = (postId) => {

    }

    try {
        
    } catch (error) {
        res.status(500).json({ error });
    }
}


/// delete ///
deleteCategory = async(req, res) => {
    const catId = req.query.catId;

    deleteCatQuery = (catId) => {
        return new Promise((res, rej) => {
            con.query('DELETE FROM categories WHERE ID = ?', [catId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results);
                }
            })
        })
    }

    try {
        await deleteCatQuery(catId);
        res.status(200).json({ message: 'cat deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}
deletePost = async(req, res) => {
    const postId = req.query.postId;

    deletePostQuery = (postId) => {
        return new Promise((res, rej) => {
            con.query('DELETE FROM posts WHERE ID = ?', [postId], (error, results, fields) => {
                if(error){
                    rej(error)
                } else {
                    res(results)
                }
            })
        })
    }

    try {
        await deletePostQuery(postId);
        res.status(200).json({ message: 'post deleted' });
    } catch (error) {
        res.status(500).json({ error });
    }
}
deleteSliderPost = async(req, res) => {
    const postId = req.query.postId;

    deleteSliderPostQuery = (postId) => {
        const query = 'DELETE FROM slider_posts WHERE ID = ?';
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
        await deleteSliderPostQuery(postId);
        res.status(200).json({ message: 'post deleted' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
module.exports = {
    /// basic ///
    adminLogin,
    adminLogout,
    getLoggedInAdminInfo,
    
    /// get ///
    getAllAdmins,
    getAllCategories,
    getSingleCategory,
    getSingleCategoryByName,
    getAllPosts,
    getSinglePost,
    getAllUsers,
    getSingleUser,
    seachUsers,
    getAllSliderPosts,
    getAllSubCategories,

    /// post ///
    addNewPost,
    addNewSliderPost,
    addNewCategory,
    addNewUser,
    addNewAdmin,
    addNewSubCategory,

    /// patch ///
    editCategory,
    editUser,
    editPost,

    /// delete ///
    deleteCategory,
    deletePost,
    deleteSliderPost
}