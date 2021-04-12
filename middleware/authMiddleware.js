const jwt = require('jsonwebtoken'); 
const User = require('../models/User');

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
/**
 * 1. check if token exists...
 * ... if so, verify token. If err when verifying... 
 * ... set res.local to null & go next()...
 * ... else find user by Id and set res.local to user. 
 * @param {*} req   send cookies.jwt to be verified
 * @param {*} res   response of null OR user
 * @param {*} next  
 */
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt; 
    if(token) {
        jwt.verify(token, process.env.jwtSecret, async (err, decodedToken) => {
            if(err) {
                console.log(err.message); 
                res.locals.user = null; 
                next(); 
            }
            else{
                console.log(decodedToken); 
                let user = await User.findById(decodedToken.id); 
                res.locals.user = user;  
                next(); 
            }
        });
    }
    else{
        res.locals.user = null; 
        next(); 
    }
    
}
module.exports = {requireAuth, checkUser}; 
