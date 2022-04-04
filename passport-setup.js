const passport  = require('passport');

require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (user, done) {
        done(null, user);
});

//Google strategy
passport.use(new GoogleStrategy({
    clientID: '620694520767-r706ipkvaatjtpjn8gpeg2eiubbc9vu1.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:4001/google/callback",
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
    console.log(profile)
    done(null, profile)
}));

//facebook strategy
passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : '309587904594769',
    clientSecret    : 'ee7cea354772f390182df0a1bbf9ef94',
    callbackURL     : "http://localhost:4001/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

    console.log(profile)
    return done(null,profile)
}));

