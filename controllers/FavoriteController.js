const Favorite = require('../model/Favorite');
const Productid = require('../model/Productid');
const Product = require('../model/Product');
const User = require('../model/user')

// const { getDataApi } = require('../services/checkDatafFromApi')
const { default: mongoose } = require('mongoose');
const axios = require('axios')

// create task
const createFavorite = async (req, res) => {

    // get value from body
    const { _id, product_id } = req.body
    let error;

    //date calculate
    const now = Date.now();
    const date = new Date(now)
    var year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
    const today = year + '-' + (month < 10 ? "0" + month : month) + '-' + (day < 10 ? "0" + day : day);
    const getWeekAgo = () => {
        const day = date.getDate() - 7;
        if (day <= 0) {
            return year + '-' + ((month - 1) < 10 ? "0" + (month - 1) : (month - 1)) + '-' + ((30 + day) < 10 ? "0" + (30 + day) : (30 + day))
        } else {
            return year + '-' + (month < 10 ? "0" + month : month) + '-' + ((day) < 10 ? "0" + (day) : (day))
        }
    }
    const weekAgo = getWeekAgo();

    let url = "https://dataapi.moc.go.th/gis-product-prices?product_id=" + product_id + "&from_date=" + weekAgo + "&to_date=" + today;
    console.log(url);
    let productData = []

    //check product id 
    try {
        await Productid.find({ product_id: product_id })
            .then(async (data) => {
                if (data.length == 0) {
                    await axios.get(url)
                        .then(async (res) => {
                            if (res.data.error == "Bad Request.") {
                                error = res.data.error
                            } else {
                                const {
                                    product_id,
                                    product_name,
                                    product_desc_en,
                                    product_desc_th,
                                    category_name,
                                    group_name,
                                    unit,
                                    price_min_avg,
                                    price_max_avg,
                                    price_list
                                } = res.data;
                                //create a new Product object
                                await Product.create({
                                    product_id,
                                    product_name,
                                    product_desc_en,
                                    product_desc_th,
                                    category_name,
                                    group_name,
                                    unit,
                                    price_min_avg,
                                    price_max_avg,
                                    price_list
                                });
                                //create a new Product id
                                await Productid.create({
                                    product_id,
                                    product_name
                                });
                            }

                        })


                } else {
                    productData.push(...data)
                }
            })
    } catch (error) {
        console.log(error);
        console.log(error.messageFormat)
    }


    //create data on mongodb
    try {
        if (error != "Bad Request.") {
            const favorite = await Favorite.create({
                user_id: new mongoose.Types.ObjectId(_id),
                product_id,
            })

            //response back
            res.status(200).send({ data: favorite, message: "success" });
        } else {
            getDataApi(product_id)
            res.status(404).send({ data: error, message: "error" });
        }

    } catch (error) {
        console.error();

        //response back
        res.status(404).send({ data: error, message: "error" });
    }

}


const updateFavorite = async (req, res) => {

    const { _id, date, priority, taskDetail, taskDate, timestamp, topic, urlPhoto, achive } = req.body

    //update task by using task id
    const updateUserTask = await Favorite.updateOne({ '_id': _id }, {
        "$set": {
            date: date,
            priority: priority,
            taskDetail: taskDetail,
            taskDate: taskDate,
            timestamp: timestamp,
            topic: topic,
            urlPhoto: urlPhoto,
            achive: achive
        }
    });

    //response data
    res.status(200).send(updateUserTask)

}

const getFavorite = async (req, res) => {

    // get user id 
    const id = req.params.id
    console.log(id)
    // find user id in db
    const getAll = await Favorite.find({ user_id: id });
    // response data
    res.status(200).send(getAll)
}

const getProductDetail = async (req, res) => {

    // get user id 
    const id = req.params.id
    // find user id in db
    const getAll = await Productid.find({ product_id: id });
    // response data
    res.status(200).send(getAll)
}


const deleteFavorite = async (req, res) => {

    const uid = req.params.user_id
    // get user id 
    const id = req.params._id

    // find data id in db
    const deleteFavoriteTask = await Favorite.remove({ user_id: uid, product_id: id });

    // response data
    res.status(200).send({ data: deleteFavoriteTask, message: "success" })
}




const createFavoriteData = async (req, res) => {

    // get value from body
    const { product_id, product_name } = req.body
    let error;
    console.log(product_id);
    //date calculate
    const now = Date.now();
    const date = new Date(now)
    var year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
    const today = year + '-' + (month < 10 ? "0" + month : month) + '-' + (day < 10 ? "0" + day : day);
    const getWeekAgo = () => {
        const day = date.getDate() - 7;
        if (day <= 0) {
            return year + '-' + ((month - 1) < 10 ? "0" + (month - 1) : (month - 1)) + '-' + ((30 + day) < 10 ? "0" + (30 + day) : (30 + day))
        } else {
            return year + '-' + (month < 10 ? "0" + month : month) + '-' + ((day) < 10 ? "0" + (day) : (day))
        }
    }
    const weekAgo = getWeekAgo();
    if (product_id.length > 0) {
        let url = "https://dataapi.moc.go.th/gis-product-prices?product_id=" + product_id + "&from_date=" + weekAgo + "&to_date=" + today;
        console.log(url);
        let productData = []

        //check product id 
        try {
            await Productid.find({ product_id: product_id })
                .then(async (data) => {
                    if (data.length == 0) {
                        await axios.get(url)
                            .then(async (res) => {
                                console.log(res.data);
                                if (res.data.error == "Bad Request.") {
                                    await Product.create({
                                        product_id: product_id,
                                        product_name: product_name,
                                        description: "data out of date"
                                    });
                                    await Productid.create({
                                        product_id: product_id,
                                        product_name: product_name
                                    });
                                    error = res.data.error
                                } else {
                                    const {
                                        product_id,
                                        product_name,
                                        product_desc_en,
                                        product_desc_th,
                                        category_name,
                                        group_name,
                                        unit,
                                        price_min_avg,
                                        price_max_avg,
                                        price_list
                                    } = res.data;
                                    //create a new Product object
                                    await Product.create({
                                        product_id,
                                        product_name,
                                        product_desc_en,
                                        product_desc_th,
                                        category_name,
                                        group_name,
                                        unit,
                                        price_min_avg,
                                        price_max_avg,
                                        price_list
                                    });
                                    //create a new Product id
                                    await Productid.create({
                                        product_id,
                                        product_name
                                    });
                                }

                            })


                    }
                })
        } catch (error) {
            // console.log(error);
            console.log(error.messageFormat)
        }

    }


    //create data on mongodb
    try {
        console.log(error);
        if (error != "Bad Request.") {
            // const favorite = await Favorite.create({
            //     user_id: new mongoose.Types.ObjectId(_id),
            //     product_id,
            // })

            //response back
            res.status(200).send({ data: product_id, message: "success" });
        } else {

            res.status(200).send({ data: product_id, message: "error" });
        }

    } catch (error) {
        console.error();

        //response back
        res.status(404).send({ data: error, message: "error" });
    }

}


module.exports = { createFavorite, getFavorite, updateFavorite, deleteFavorite, getProductDetail, createFavoriteData };
