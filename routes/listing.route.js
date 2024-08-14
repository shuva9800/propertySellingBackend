const express = require('express');
const { createListing, deleteListing, updateListing, getListing,getListings } = require('../controller/listing.controller');
const { checkAuthentication } = require('../middleware/verifyUser');
const router = express.Router();


router.post('/create',checkAuthentication, createListing)

router.delete('/delete/:id', checkAuthentication, deleteListing);
router.post('/update/:id', checkAuthentication, updateListing);
router.get('/get/:id',  getListing)
router.get('/get', getListings);





module.exports = router