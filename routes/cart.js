import express from "express";
const cart = require('../models/cart.schema')

const cartRouter = express.Router();

cartRouter.route('/addToCart/:user').put((req,res)=>{
    const body = req.body;
    const user = req.params['user'];
    console.log(body);
    console.log(user);
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    cart.updateOne({"buyer": user}, {"$push": {
        "items":body
    }}, options).then(status=> res.send(status)).catch(err=> res.status(400).json(err));

})


cartRouter.route('/delete/:user').delete((req,res)=>{
    const user = req.params['user'];
    console.log(user);

    cart.remove({"buyer": user}).then(status=> res.send(status)).catch(err=> res.status(400).json(err));

})

cartRouter.route('/getCartItems/:user').get((req, res) => {
    const user = req.params['user'];
    cart.findOne({buyer: user})
        .then(book => res.json(book))
        .catch(err => res.status(400).json('Err: '+err))
})


export default cartRouter;
