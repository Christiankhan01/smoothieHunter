const User=require('../models/User');
const jwt=require('jsonwebtoken');

//error handlers
const handleErrors=(err) => {
    console.log(err.message, err.code);
    let errors={email: '', password: ''};

    //duplicate error code
    if(err.code===11000) {
        errors.email='This email has been registered';
        return errors;
    }


    //validation errors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path]=properties.message;
        })
    }
    return errors;
}

//jwt - set in seconds NOT milliseconds
const maxAge = 3 * 24 * 60 * 60; 
const createToken=(id) => {
    return jwt.sign({id}, '123123', {
        expiresIn: maxAge 
    }); 
}



module.exports.signup_get=(req, res) => {
    res.render('signup');
}

module.exports.login_get=(req, res) => {
    res.render('login');
}

module.exports.signup_post=async (req, res) => {
    const {email, password}=req.body;
    try {
        //ID for jwt
        const user=await User.create({email, password})
        const token = createToken(user._id); 
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}); //set in milliseconds
        res.status(201).json({user: user._id});
    } catch(err) {
        const errors=handleErrors(err);
        res.status(400).json({errors})
    }
}

module.exports.login_post=async (req, res) => {
    const {email, password}=req.body;


    console.log(email, password);
    res.send('user login');
}