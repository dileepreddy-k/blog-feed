const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const saltRounds = 10;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre('save',function(next){
    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password,saltRounds , function(err, hashedPassword){
            if(err){
                next(err);
            }else{
                document.password = hashedPassword;
                next();
            }
        })
    }else{
        next();
    }
})

UserSchema.methods.isCorrectPassword = function(password,callback){
    bcrypt.compare(password,this.password,function(err,same){
        if(err){
            callback(err)
        }else{
            callback(err,same)
        }
    })
}

module.exports = mongoose.model("users", UserSchema)

