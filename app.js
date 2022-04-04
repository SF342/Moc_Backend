require('dotenv').config()
require('./config/database').connect();

const passport = require('passport');
const cookieSession = require('cookie-session')
const todo = require('./routes/todo')
const favorite = require('./routes/Favorite')
const express = require('express')
const auth = require('./middleware/auth');
const authUser = require('./routes/auth')
var bodyParser = require('body-parser');
require('./passport-setup');

const app = express()

app.set("view engine", "ejs")

app.use(express.json())

app.use('/auths', authUser);

app.use('/moc', todo)
app.use('/favorite', favorite)

app.post('/welcome', auth, (req, res) =>{
    res.status(200).send("Welcome")
})



//Setting up cookies
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
}))

//Logged In Middleware
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

//Passport Initialized
app.use(passport.initialize());

//Setting Up Session
app.use(passport.session())

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.get('/failed', (req, res) => res.send('You Failed to log in!'))

app.get('/good',  (req, res) => {
    console.log(req.user.photos[0].value)
    res.render('pages/profile.ejs',{
        name:req.user.displayName,
        pic:req.user._json.picture,
        email:req.user.emails[0].value,
        profile: "google"
    })
})

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', 
    passport.authenticate('google', 
    {failureRedirect: '/failed'}), 
    (req, res) => {
        res.redirect('/good');
    })

app.get('/profile',  (req,res) => {
    console.log("----->",req.user)
    res.render('pages/profile', {
        profile: "facebook",
        name:req.user.displayName,
        pic:req.user.photos[0].value,
        email:req.user.emails[0].value // get the user out of session and pass to template
    });
})

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect : '/profile',
        failureRedirect : '/'
    }
));

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;