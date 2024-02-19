const jwt = require('jsonwebtoken')

const fetchingUser = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ MSG: 'Please, Login first' });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            console.log(req.user);
            next();
        } catch (error) {
            console.error('Token verification error:', error);
            res.status(401).send({ error: "Please authenticate with valid token" });
        }
    }
};

module.exports = { fetchingUser };
