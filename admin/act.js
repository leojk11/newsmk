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


/// get ///
getAllAdmins = async(req, res) => {
    const adminId = req.admin.adminId;
    console.log(adminId);

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

    try {
        res.status(200).json({ users });
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
    try {
        const posts = await allPostsQuery();
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ error });
    }
}


/// post ///
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
        image: req.body.image,
        writer: userFullName,
        views: 0
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

    addNewPostQuery = (data) => {
        return new Promise((res, rej) => {
            con.query('INSERT INTO posts(title, text, image, writer, views, date_posted, time_posted, category, category_id) VALUES(?,?,?,?,?,CURRENT_DATE,CURRENT_TIMESTAMP(),?,?)', [data.title, data.text, data.image, data.writer, data.views, data.category, data.catId], (error, results, fields) => {
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
module.exports = {
    /// basic ///
    adminLogin,
    adminLogout,
    
    /// get ///
    getAllAdmins,
    getAllCategories,
    getSingleCategory,
    getAllPosts,
    getAllUsers,

    /// post ///
    addNewPost,
    addNewCategory,
    addNewUser,

    /// patch ///
    editCategory,

    /// delete ///
    deleteCategory,
    deletePost
}