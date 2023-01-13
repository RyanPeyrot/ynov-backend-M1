const authController = require("../controllers/auth.controller");
const express = require("express");
const validateUser = require("../middlewares/validateUser");
const router = express.Router();

router.post('/register',
    validateUser,
    authController.register);

router.post('/login',authController.login);

module.exports = router;