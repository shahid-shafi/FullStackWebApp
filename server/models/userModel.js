import crypto from 'crypto'
import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { Document } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your Name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: { // This only works on create and save
            validator: function (passConf) {
                return passConf === this.password
            },
            message: 'Passwords are not same'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
})

userSchema.pre('save', async function (next) {

    //Encription: Hash the password field with cost of 12
    this.password = await bcrypt.hash(this.password, 12,)

    //Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    // console.log(this.passwordResetExpires)
    return resetToken;
}

const User = model('User', userSchema);
export default User;