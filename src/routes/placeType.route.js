const express = require("express");
const router = express.Router();
const typeController = require("../controllers/placeType.controller");
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.post('/', typeController.createOne);
router.get('/all', typeController.getAll);
/*router.get('/', typeController.getOneById);
router.put('/', typeController.updateOne);
router.delete('/:id',verifyToken, verifyAdmin, typeController.deleteOne);*/


module.exports = router;