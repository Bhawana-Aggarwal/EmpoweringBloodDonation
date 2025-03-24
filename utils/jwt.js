const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET ;

exports.generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        role: user.role
    },
        SECRET_KEY, { expiresIn: '1d' }
    );
};

exports.verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};
