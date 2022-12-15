const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get('',userController.getAll);
router.get(':id',userController.getOneById);
router.post('auth',userController.create);
router.put(':id',userController.updateOne);
router.delete(':id',userController.deleteOne);

module.exports = router;