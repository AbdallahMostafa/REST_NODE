const express = require('express');
const { body } = require('express-validator'); 
const User = require('../models/user');

const router = express.Router();
const authController = require('../controllers/auth');

router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('please enter a valid email')
        .custom((value, { req }) => {
            return User.findOne({emial: vlaue}).then(userDoc => {
                if(userDoc) {
                    return Promise.reject('E-mail address already exists');
                }
            });
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min : 5}),
    body('name')
        .trim()
        .not()
        .isEmpty()
], authController.singup);

router.post('/login', authController.login);
module.exports = router;