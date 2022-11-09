import User from "../models/userModel.js";
import * as Handler from "../controllers/handlerFactory.js"

export const getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

export const getUser = Handler.getOne(User);
export const updateUser = Handler.updateOne(User);

