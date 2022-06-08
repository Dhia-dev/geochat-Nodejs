const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

const upload = require("../middleware/storage");




router.post("/register",upload.single('image'),userController.register);

router.post('/login',userController.login);

router.get('/users',userController.list);


router.get('/user/:id',userController.getUserById);

router.get('/usr/:id',userController.getusers);

router.put('/changePassword',userController.changePassword)

router.put('/updateUser',upload.single('image'),userController.updateUser)

router.post('/resetpass',userController.sendEmail)
router.post('/update',userController.updateProfile)






module.exports = router;