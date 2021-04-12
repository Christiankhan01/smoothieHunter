const mongoose=require('mongoose');
const {isEmail}=require('validator');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Email address not valid']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password must be atleast 6 characters long']
    },
});

/**
 ** function BEFORE doc saved to database
 ** Salt Then Hash password with bcrypt 
 */

userSchema.pre('save', async function(next) {
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password, salt);
    next();
})
/**
 ** function AFTER doc saved to database
 ** Log to console that user was created and saved
 */

userSchema.post('save', function(doc, next) {
    console.log('new user was created & saved to DB', doc);
    next();
})
/**
 * Login function takes email and password input...
 * ...and 1. Checks in database if email exists ...
 * ...and 2. compares ENCRYPTED passwords ... 
 *
 * @param {*} email 
 * @param {*} password 
 * @returns user if True else Error if False
 */

userSchema.statics.login=async function(email, password) {
    const user=await this.findOne({email});

    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth){
            return user; 
        }
        throw Error('Incorrect Password'); 
    }
    throw Error('Incorrect Email'); 
}

const User=mongoose.model('user', userSchema);

module.exports=User;