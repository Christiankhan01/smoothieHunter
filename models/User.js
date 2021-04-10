const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt'); 

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

//function BEFORE doc saved to database
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(); 
    this.password = await bcrypt.hash(this.password, salt); 
    next(); 
})
//function AFTER doc saved to database
userSchema.post('save', function(doc, next) {
    console.log('new user was created & saved', doc); 
    next();
})




const User = mongoose.model('user', userSchema);

module.exports = User; 