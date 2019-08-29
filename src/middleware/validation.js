import {validationResult} from "express-validator/check";

const postCheckValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    next()
};
export {
    postCheckValidation
}