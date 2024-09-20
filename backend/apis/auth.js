const jwt = require("jsonwebtoken");
const JWT_SECRET = "";


// Authenticates the request
// checks if 'token' is present and valid
async function auth(req, res, next) {
    // check if token is present
    const userToken = req.headers.authorization;
    try {
        const tokenVerificationResponseObject = await jwt.verify(userToken, JWT_SECRET);
        if (tokenVerificationResponseObject) {                    
            req.userId = tokenVerificationResponseObject.userId;
            next();
        }
        else {
            res.status(403).json({
                message: "Invalid Token!"
            });
            return;
        }
    } catch(e) {
        res.status(403).json({
            message: "Error! Invalid Token!"
        });
    }
}

module.exports = {
    jwt,
    JWT_SECRET,
    auth
}