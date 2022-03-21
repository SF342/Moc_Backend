const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs/dist/bcrypt');


// Register
const register = async (req, res) => {
    
    try{
        // Get value
        const {username, email, password} = req.body

        // Validate input
        if (!(email && password && username)) {
            res.status(400).send('Pls send all input')
        }

        // Check email already exist ?
        const oldUser = await User.findOne({ email });

        if( oldUser ){
            return res.status(409).send("USer already exist")
        }

        // bcrypt
        encryptedPassword = await bcrypt.hash(password, 10)

        // create user in db
        const user = await User.create({
            username,
            email : email.toLowerCase(),
            password : encryptedPassword
        })


        //Token Create
        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn : '2h'
            }
        )
         
        user.token = token;

        return res.status(201).json(user)

    } 
    catch {
        console.log(err)
    }
}

// Login 
const login = async (req, res) => {

    try{
        const {email, password} = req.body
        if(!(email && password)){
            res.status(400).send("ALl Input is required")
        }
        const user = await User.findOne({email});

        if (user && ( bcrypt.compare(password, user.password))){

            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: '2h',
                }
                )
             //save token
             user.token = token;

            return res.status(200).json(user)
        }

        return res.status(400).send("Invalid auth login")

    }
    catch(err){
        console.log(err)
    }

}

module.exports = {login, register};