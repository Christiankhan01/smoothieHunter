const jwt = require('jsonwebtoken'); 

/**
 * Grab token
 * Check jwt exists and verified
 * Error Check - redirect / next() 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt; 
    
    if(token) {
        jwt.verify(token, process.env.jwtSecret, (err, decodedToken) => {
            if(err) {
                console.log(err.message); 
                res.redirect('/login');
            }
            else{
                next(); 
                console.log(decodedToken); 
            }
        });
    }
    else{
    res.redirect('/login');    
    }
}
module.exports = {requireAuth}; 
