import catchAsync from "../utils/catchAsync.js";
import AppError from '../utils/appError.js'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import crypto from 'crypto'
import sendEmail from "../utils/email.js";
import { promisify } from 'util'

const sighToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res, message) => {
    const token = sighToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;

    res.status(statusCode).json({
        result: 'success',
        token,
        message,
        user
    });
}

export const signup = catchAsync(async (req, res, next) => {

    const email = req.body.email
    const user = await User.findOne({
        email
    })

    if (user) {
        res.status(200).json({
            status: 'success',
            message: "Email already exists, use different email id"
        })
    } else {

        const newUser = await User.create({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });
        console.log(newUser);
        let message = 'Account Created Successfully!'

        createSendToken(newUser, 201, res, message)
    }
})

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //1. Check email and password exists.
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400))
    }

    //2. Check if user exists && pasword is correct.
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401))
    }

    let message = 'Login Successfully!'
    //3. If everything is ok, send token to client
    createSendToken(user, 200, res, message)
})

export const isLoggedIn = catchAsync(async (req, res, next) => {
    //1. Getting Token and checking in databases
    let token = req.params.jwtToken.split(' ')[1];
    console.log(token)
    if (!token) {
        return next(new AppError('You are not logged in!. Please login to get access', 401))
    }
    //2. Validate token  
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    //3. Check if user exists
    const user = await User.findById(decoded.id);
    if (!user) {
        return next(new AppError('User beloging to this token does not exist', 401))
    }

    //Access Granted 
    res.status(200).json({
        result: 'success',
        isAuthanticated: true,
        user
    })
})

export const forgotPassword = catchAsync(async (req, res, next) => {
    //1. Get the user based on Posted email.
    const user = await User.findOne({ email: req.body.email }).select('+password');

    if (!user) {
        res.status(200).json({
            status: 'success',
            message: "Sorry we couldn't find your account."
        })
    } else {

        //2. Generate the random reset Token.
        const resetToken = user.createPasswordResetToken(user);
        console.log(`ResetToken: ${resetToken}`)
        await user.save({ validateBeforeSave: false });

        //3. Send token to user's email.
        // const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`
        const resetURL = `http:localhost:3001/#/resetPassword/${resetToken}`

        const message = `We heard you lost your Password. Don't worry Submit a PATCH request with new password and passwordConfirm to: ${resetURL}.\n If your didn't request for this, please ignore this email.`

        try {

            let info = await sendEmail({
                email: user.email,
                subject: 'Your password reset token(valid for 10 minutes)',
                message,
                resetURL
            })

            res.status(200).json({
                status: 'success',
                message: 'Passsword reset link send to email address!'
            })

        } catch (err) {
            console.log("Error: ", err)
            user.passwordResetToken = undefined
            user.passwordResetExpires = undefined
            await user.save({ validateBeforeSave: false })

            return next(new AppError('There was an error sending the email! Please try again', 500))
        }
    }
})

export const resetPassword = catchAsync(async (req, res, next) => {
    // const currentPassword = req.body.currentPassword;
    console.log(req.body, req.params.token)

    const hashToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    console.log(hashToken)
    // 1): Get user based on token
    const user = await User.findOne({
        passwordResetToken: hashToken
        // , passwordResetExpires: { $gt: Date.now() }
    }).select("passwordResetExpires")

    console.log(user.passwordResetToken, hashToken);

    // 2): If token has not expired. and there is user, set the new password
    if (!user) {
        return next(new AppError('Token is invalid or expired', 400))
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 4): Log the user in, send JWT
    createSendToken(user, 200, res)
})