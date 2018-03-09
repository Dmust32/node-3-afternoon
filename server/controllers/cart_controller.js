const swag = require('../models/swag')

module.exports={
    add: (req, res, next)=>{
        const {id} = req.query;
        const {cart} = req.session.user;

        const index = cart.findIndex(swag=>swag.id == id)

        if (index=== -1){
            const swagItem = swag.find(swag=>swag.id == id );

            cart.push(swagItem);
            req.sessionuser.total += swagItem.price
        }
        res.status(200).send(req.session.user)

    },
    delete: (req, res, next)=>{
        const {id} = req.query;
        const {cart} = req.session.user;
        const itemToDelete = swag.find(swag=> swag.id == id);

        if (itemToDelete){
            cart.splice(itemToDelete, 1);
            req.session.user.total -= itemToDelete.price
        }
        res.status(200).send(req.session.user)
    },
    checkout: (req, res, next)=>{
        const {user} = req.session;
        user.cart = [];
        user.total = 0;

        res.status(200).send(req.session.user)

    },
}