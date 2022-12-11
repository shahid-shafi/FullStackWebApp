import catchAsync from '../utils/catchAsync.js';
import AppError from "../utils/appError.js"


export const getOne = (Model) => {
    return catchAsync(async (req, res, next) => {
        const user = await Model.findById(req.params.id);

        if (!user) {
            return next(new AppError('No User found with that Id', 404))
        }

        res.status(200).json({
            result: "success",
            data: user
        })
    });
}

export function updateOne(Model) {
    return catchAsync(async (req, res, next) => {

        const { email, username } = req.body
        console.log(email, username)
        const user = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        console.log(req.body)
        if (!user) {
            return next(new AppError('No document found with that Id', 404))
        }

        res.status(200).json({
            result: 'success',
            message: "User updated successfully",
            data: user
        })

    });
}