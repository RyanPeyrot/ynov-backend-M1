const express = require("express");
const router = express.Router();
const typeController = require("../controllers/placeType.controller");
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/all', verifyToken, verifyAdmin, typeController.getAll);
router.get('/', verifyToken, typeController.getOneById);
router.put('/',verifyToken, typeController.updateOne);
router.delete('/:id',verifyToken, verifyAdmin, typeController.deleteOne);

module.exports = router;