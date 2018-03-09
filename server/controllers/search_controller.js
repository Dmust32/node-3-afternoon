const swag = require('../models/swag')

module.exports={
    search: (req, res, next)=>{
        const {category} = req.query;
        if(category){
            const filtered = swag.filtered(swag=> swag.category == category);
            req.status(200).send(filtered)
        }
        else{
            res.status(200).send(swag)
        }
    }
}