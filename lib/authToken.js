const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.headers['x-auth'];
    if(!token) return res.status(403).json({'error': 'invalid token'})
    
    try {
        jwt.verify(token, process.env.PRIVATE_KEY);
        next();
    } catch (err) {
        console.error(err);
        res.status(403).json({'error': 'invalid token'})
    }
}