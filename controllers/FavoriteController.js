const Favorite = require('../model/Favorite');
const User = require('../model/user')
const { default: mongoose } = require('mongoose');

// create task
const createFavorite = async (req, res) => {

    // get value from body
    const { _id, product_id, product_name } = req.body

    //create data on mongodb
    const favorite = await Favorite.create({
        id_user: new mongoose.Types.ObjectId(_id),
        product_id,
        product_name,
    })

    //response back
    res.json(favorite);

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

    // find user id in db
    const getAll = await Favorite.find({ id_user: id });

    // response data
    res.status(200).send(getAll)
}

const deleteFavorite = async (req, res) => {

    // get user id 
    const id = req.params.id

    // find data id in db
    const deleteFavorite = await Favorite.deleteOne({ _id: id });

    // response data
    res.status(200).send({ data: deleteFavorite, word: "success" })
}


module.exports = { createFavorite, getFavorite, updateFavorite, deleteFavorite };
