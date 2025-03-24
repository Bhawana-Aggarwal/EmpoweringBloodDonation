const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET ;

exports.authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ message: "Login Before Accessing." });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified; // attach user to the request
        next(); // move to the route 
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
