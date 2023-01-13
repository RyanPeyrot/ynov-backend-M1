const express = require("express");
const router = express.Router();
const placeController = require("../controllers/place.controller");
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

//router.get('/all', verifyToken, verifyAdmin, placeController.getAll);
router.post('/',verifyToken, placeController.createOne);
router.get('/myplaces', verifyToken, placeController.getMyPlaces);
router.get('/myplace',verifyToken, placeController.getMyPlace);
router.get('/places', verifyToken, placeController.getPlacesByUser);
router.get('/place',verifyToken, placeController.getPlaceByUser);
router.delete('/:id',verifyToken, verifyAdmin, placeController.deleteOne);

module.exports = router;