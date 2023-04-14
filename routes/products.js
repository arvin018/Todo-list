var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');
const Products = require('../models/Products');

const v = new Validator;

const {Product} = require('../models');

router.post('/',async(req,res)=>{
    const schema = {
        name: "string" ,
        brand: "string",
        description :'string|optional'
    }

    const validate = v.validate(req.body, schema);
    
    if(validate.length){
        return res.status(400).json(validate)
    }

    const product = await Product.create(req.body);

    res.status(200).json(product);
});

router.put('/:id',async (req,res)=>{
    const id = req.params.id;

    const product = await Product.findByPk(id);
    if(!product){
    return res.status(400).json({message:"Product not Found"});

    }

    res.send('Ok');
})


module.exports = router;
