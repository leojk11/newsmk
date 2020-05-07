const con = require('../DB/db');

// admin login
adminLogin = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const adminUsernames = await queries.getAllAdminUsernameQuery();

    // getAdminUsernameesQuery = () => {
    //     const query = 
    // }

    const adminExists = adminUsernames.some(admin => {
        return username == admin.Username
    });

    if (username == '') {
        res.status(400);
        res.json({
            message: 'Please enter username.'
        });
    } else if (password == '') {
        res.status(400);
        res.json({
            message: 'Please enter your password.'
        })
    } else if (adminExists == false) {
        res.status(400);
        res.json({
            message: 'You have entered wrong username.'
        });
    }
    try {
        const admin = await queries.adminLoginQuery(username);
        // const adminPassword = admin[0].Password;
        const adminId = admin[0].ID;
        // const matchPassword = bcrypt.compareSync(password, adminPassword);
        const matchPassword = admin.some(admin => {
            return password == admin.Password
        });

        if (matchPassword == true) {
            const payload = {
                adminId: adminId
            };

            const token = jwt.sign(payload, process.env.SECRET);
            res.cookie('access_token', token, {
                maxAge: 365 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            res.status(200);
            res.json({
                message: 'logged in',
                token
            });
        } else {
            res.status(400);
            res.json({
                message: 'Password that you have entered is incorrect.'
            });
            // res.redirect('http://localhost:3000/superadmin/dashboard');
        };
    } catch (error) {
        const errorMsg = error.message;
        res.status(500);
        res.json({
            message: errorMsg
        });
    };
}

module.exports = {
    adminLogin
}