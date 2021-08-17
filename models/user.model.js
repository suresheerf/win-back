const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const  bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'please provide your name.']
    },
    email : {
        type:String,
        require :[true ,'user must have an Email'],
        unique: true,
        lowercase:true,
        validate:[validator.isEmail,'Email must be valid']

        },
    img:{
        type:String,
        default:'man.png'
    },
    password:{
        type:String,
        required:[true,'please enter your password'],
        minlength: 8,
        select: false
         },
    confirmPassword:{
        type:String,
        required:[true,'please confirm your password'],
        validate:{
            ////////this only works for create or save functions. not for updates
            validator: function (el){
                return el === this.password;
            },
            message:"passwords are not same."
        }
        },
    changedAt: Date,
    role:{
        type:String,
        enum:['user' ,'admin','tutor'],
        default:'user'
    },
    passwordResetToken: String,
    resetTokenExpiresIn: Date,
    active :{
        type:Boolean,
        default: true
    }
    }
    
);

userSchema.pre('save', async function(next){

    if(!this.isModified('password')) return next();
   
this.password = await bcrypt.hash(this.password , 12);

this.confirmPassword = undefined;
next();
});

userSchema.pre('save', async function (next){
    if(!this.isModified('password') || this.isNew) return next();

    this.changedAt = Date.now()-1000;
    next();
});

userSchema.pre(/^find/,function(next){
    this.find( {active : {$ne:false}} );
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword , userPassword){
    return await bcrypt.compare(candidatePassword , userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTtokenTime){
    if(this.changedAt){
    const t = parseInt(this.changedAt.getTime()/1000,10);
        
    return (t>JWTtokenTime)
    }

    return false
}
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetTokenExpiresIn = Date.now()+10*60*1000;

    return resetToken
}


const user = mongoose.model('user',userSchema);

module.exports = user;

