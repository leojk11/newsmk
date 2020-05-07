const jwt = require('jsonwebtoken');
require('dotenv/config');

verifyTokenAdmin = (req, res, next) => {
    try {
        const token = req.cookies.admin_token;
        const decoded = jwt.verify(token, process.env.SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        res.redirect('http://localhost:3000/admin');
    }
}

module.exports = {
    verifyTokenAdmin
}