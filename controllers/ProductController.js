const Product = require('../model/Product');


const { default: mongoose } = require('mongoose');
const axios = require('axios')

// create task
const getProduct = async (req, res) => {
    let PID = req.body.productid;

    const getProduct = await Product.findOne({ product_id: PID });
    res.status(200).send(getProduct);
}


const getProductLastPrice = async (req, res) => {
    let PID = req.body.productid;

    const getProduct = await Product.findOne({ product_id: PID });
    
    getProduct.price_list = [getProduct.price_list[(getProduct.price_list.length)-1]]
    res.status(200).send(getProduct);

}



module.exports = { getProduct, getProductLastPrice };
