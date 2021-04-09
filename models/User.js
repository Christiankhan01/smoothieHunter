const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: [true, 'Please enter an email'], 
        unique: true, 
        lowercase: true,
        validate: [isEmail,  'Email address not valid']
    }, 
    password: {
        type: String, 
        required: [true, 'Please enter a password'], 
        minlength: [6, 'Password must be atleast 6 characters long']
    }, 
}); 

const User = mongoose.model('user', userSchema);

module.exports = User; 