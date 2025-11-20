const express = require("express");
const authController = require("../Controllers/auth.controller")
const authMiddleware = require("../Middlewares/auth.middleware")

const router = express.Router();

router.post('/user/signup', authController.signUpUser)
router.post('/user/signin', authController.signInUser)

router.put('/user/update', authMiddleware, authController.updateUser)
router.get('/account/balance', authMiddleware, authController.getBalance);
router.get('/account/filter', authMiddleware, authController.filterUserByName);
router.post('/account/transfer', authMiddleware, authController.transferAmount)
module.exports = router;