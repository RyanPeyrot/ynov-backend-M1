const express = require("express");
const router = express.Router();
const placeController = require("../controllers/place.controller");
const verifyToken = require('../middlewares/verifyToken');
const verifyOwner = require('../middlewares/verifyOwner');

router.get('/', placeController.getPlaces);
router.post('/',verifyToken, verifyOwner, placeController.createOne);
router.get('/myplaces', verifyToken, placeController.getMyPlaces);
router.get('/myplace/:id',verifyToken, placeController.getMyPlace);
router.put('/myplace/:id',verifyToken, placeController.updateMyPlace);
router.delete('/myplace/:id',verifyToken, placeController.deleteMyPlace);
/*
router.get('/places', verifyToken, placeController.getPlacesByUser);
router.get('/place',verifyToken, placeController.getPlaceByUser);
*/

module.exports = router;