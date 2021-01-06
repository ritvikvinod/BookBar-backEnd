import express from "express";
const wish = require('../models/wishList.schema')

const wishRouter = express.Router();

wishRouter.route('/addToWish/:user').put((req,res)=>{
    const body = req.body;
    const user = req.params['user'];
    console.log(body);
    console.log(user);
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    wish.updateOne({"buyer": user}, {"$push": {
        "items":body
    }}, options).then(status=> res.send(status)).catch(err=> res.status(400).json(err));

})

wishRouter.route('/delete/:user').delete((req,res)=>{
    const user = req.params['user'];
    console.log(user);
    wish.remove({"buyer": user}).then(status=> res.send(status)).catch(err=> res.status(400).json(err));
})

wishRouter.route('/getWishlist/:user').get((req, res) => {
    const user = req.params['user'];
    wish.findOne({buyer: user})
        .then(book => res.json(book))
        .catch(err => res.status(400).json('Err: '+err))
})




export default wishRouter;