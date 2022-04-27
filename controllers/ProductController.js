const Product = require('../model/Product');
const { default: mongoose } = require('mongoose');

// create task
const getProduct = async (req, res) => {
    let PID = req.params['pid'];
    try {
        const getProduct = await Product.findOne({ product_id: PID });
        res.status(200).send(getProduct);
    } catch (error) {
        console.log(error);
        res.status(200).send(error)
    }
}


const getProductLastPrice = async (req, res) => {
    let PID = req.params['pid'];
    try {
        const getProduct = await Product.findOne({ product_id: PID });

        getProduct.price_list = [getProduct.price_list[(getProduct.price_list.length) - 1]]
        res.status(200).send(getProduct);
    } catch (error) {
        console.log(error);
        res.status(200).send(error);
    }


}



module.exports = { getProduct, getProductLastPrice };
