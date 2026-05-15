import { body, validationResult } from 'express-validator';

export const registerValidation = [

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email'),

    body('username')
        .trim()
        .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters long')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores')
        .notEmpty().withMessage('Username must be at least 3 characters long'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        return next();
    },
];

export default registerValidation;


