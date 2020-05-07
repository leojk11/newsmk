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

module.exports = {
    adminLogin,
    adminLogout,
    
    getAllAdmins
}