const Listing = require('../model/listing.model')

exports.createListing = async (req,res)=>{
    try{
         const listing = await Listing.create(req.body);
         return res.status(200).json({
            success:true,
            message:"listing successful",
            data:listing
         })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: "server error",
            error:error.message,
        })
    }
}
//delete listing
exports.deleteListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
  
    if (!listing) {
      return res.status(404).json({
        success:false,
        message: "listing not found",
      })
    }
  
    if (req.user.id !== listing.userRef) {
      return res.status(402).json({
        success:false,
        message:'You can only delete your own listings!'
      })
    }
  
    try {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json('Listing has been deleted!');
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "server error",
            error:error.message,
        })
    }
  };

//Update listing
exports.updateListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "listing not found!",
      })
    }
    if (req.user.id !== listing.userRef) {
      return res.status(401).json({
        success: false,
        message:'You can only update your own listings!'
      }) 
    }
    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedListing);
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "server error",
            error:error.message,
        })
    }
  };

 

  //get listing by specfic id
  exports.getListing = async (req,res)=>{
    try{
        const listingItems = await Listing.findById(req.params.id);
        if(!listingItems){
          return res.status(404).json({
            success:false,
            message: "listing not found",
          })
        }
        return res.status(200).json(listingItems);
    }
    catch(error){
      return res.status(500).json({
        success:false,
        message: "server error",
        error:error.message,
    })
    }
  }

  exports.getListings = async (req,res)=>{
    try{
      const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sell', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
    }
    catch(error){
      return res.status(500).json({
        success:false,
        message: "server error",
        error:error.message,
    })
    }
  }