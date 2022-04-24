const mongoose = require('../../database/index');
const dcrypt = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: true,
    },
    passwordResetExpires: {
        type: Date,
        select: true,
    },
    createdAt:{
        type:  Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 5);
    this.password = hash;

    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;