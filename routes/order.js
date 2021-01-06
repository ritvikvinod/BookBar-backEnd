import express from "express";

const order = require('../models/order.schema')

const orderRoutes = express.Router();

orderRoutes.route('/addToOrder/:user').post((req,res)=>{
    const body = req.body;
    const user = req.params['user'];
    const newOrder = new order({buyer:user, items:body})
    newOrder.save().then(status=> res.send(status)).catch(err=> res.status(400).json(err));

})


orderRoutes.route('/allOrders/:user').get((req,res)=>{
    const user = req.params['user'];
    order.find({buyer:user}).then(book=> res.json(book)).catch(err=> res.status(400).json(err));
})

orderRoutes.route('/allOrdersForSeller/:seller').get((req,res)=>{
    const seller = req.params['seller'];
    order.find({items: {$elemMatch:{"seller" : seller}}}).then(books=> res.json(books)).catch(err=> res.status(400).json(err));
})

// orderRouter.route('/delete/:user').delete((req,res)=>{
//     const user = req.params['user'];
//     console.log(user);

//     cart.remove({"buyer": user}).then(status=> res.send(status)).catch(err=> res.status(400).json(err));

// })


export default orderRoutes;