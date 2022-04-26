const Todo = require('../model/Todo');
const User = require('../model/user')
const { default: mongoose } = require('mongoose');

// create task
const createTask = async (req, res) => {

    // get value from body
    const { _id, product_id, product_name } = req.body
    try {
        const users = await User.findOne({ _id });
        //create data on mongodb
        const todo = await Todo.create({
            id_user: new mongoose.Types.ObjectId(users._id),
            product_id,
            product_name
        })

        //send data back
        res.json(todo);
    } catch (error) {

        console.log(error);
        res.status(200).send(error);

    }


}

// create task
const updateTask = async (req, res) => {

    const { _id, date, priority, taskDetail, taskDate, timestamp, topic, urlPhoto, achive } = req.body

    //update task by using task id
    try {
        const updateUserTask = await Todo.updateOne({ '_id': _id }, {
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

        //send data back
        res.status(200).send(updateUserTask)

    } catch (error) {

        console.log(error);
        res.status(200).send(error);

    }


}

const getTodosByUId = async (req, res) => {

    // get user id 
    const id = req.params.id
    try {
        // find user id in db
        const getAllTask = await Todo.find({ id_user: id });

        // send back data
        res.status(200).send(getAllTask)

    } catch (error) {

        console.log(error);
        res.status(200).send(error);

    }

}

const deleteTask = async (req, res) => {

    // get user id 
    const id = req.params.id
    try {
        // find user id in db
        const getAllTask = await Todo.deleteOne({ _id: id });

        // send back data
        res.status(200).send({ data: getAllTask, word: "success" })

    } catch (error) {

        console.log(error);
        res.status(200).send(error);

    }

}


module.exports = { createTask, getTodosByUId, updateTask, deleteTask };
