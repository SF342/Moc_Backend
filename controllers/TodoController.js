const Todo = require('../model/Todo');
const User = require('../model/user')
const { default: mongoose } = require('mongoose');

// create task
const createTask = async (req, res) => {

    // get value from body
    const {_id, date, priority, taskDetail, taskDate, textTime, timestamp, topic, urlPhoto} = req.body
    const users = await User.findOne({_id});
    //create data on mongodb
    const todo =  await Todo.create({
        id_user: new mongoose.Types.ObjectId(users._id),
        date,
        priority,
        taskDetail,
        taskDate,
        textTime,
        timestamp,
        topic,
        urlPhoto,
        achive: false
    }) 
    
    //send data back
    res.json(todo);
    
}

// create task
const updateTask = async (req, res) => {

    const {_id, date, priority, taskDetail, taskDate, timestamp, topic, urlPhoto, achive} = req.body

    //update task by using task id
    const updateUserTask = await Todo.updateOne({'_id': _id}, {"$set": {
        date: date,
        priority: priority,
        taskDetail : taskDetail,
        taskDate : taskDate,
        timestamp : timestamp,
        topic : topic,
        urlPhoto : urlPhoto,
        achive : achive
      }});
      
      //send data back
      res.status(200).send(updateUserTask)

}

const getTodosByUId = async (req, res) => {

    // get user id 
    const id = req.params.id

    // find user id in db
    const getAllTask = await Todo.find({id_user : id });

    // send back data
    res.status(200).send(getAllTask)
}

const deleteTask = async (req, res) => {

    // get user id 
    const id = req.params.id

    // find user id in db
    const getAllTask = await Todo.deleteOne({_id : id });

    // send back data
    res.status(200).send({data: getAllTask, word:"success"})
}


module.exports = {createTask, getTodosByUId, updateTask, deleteTask};
