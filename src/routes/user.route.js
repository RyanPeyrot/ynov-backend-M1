const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/all', verifyToken, verifyAdmin, userController.getAll);
router.get('/', verifyToken, userController.getOneById);
router.put('/',verifyToken, userController.updateOne);
router.delete('/:id',verifyToken, verifyAdmin, userController.deleteOne);

module.exports = router;