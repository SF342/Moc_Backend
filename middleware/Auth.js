const jwt = require('jsonwebtoken')

const config = process.env

// Verify user token
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if(!token){
        return res.status(403).send("Require token for Auth")
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY)
        req.users = decoded;

    }
    catch (err) {
        return res.status(401).send("Invalid Token")
    }

    return next();

}

module.exports = verifyToken