//------------ Requirements ------------//
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('./strategies/userStrategy');
var session = require('express-session');

var favorites = require('./routes/favorites');
var register = require('./routes/register');
var user = require('./routes/user');
var index = require('./routes/index');


//------------ Middlware ------------//
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//------------ Passport Session Configuration ------------//
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());


//------------ Express Routes ------------//
app.use('/favorites', favorites);
app.use('/register', register);
app.use('/user', user);
app.use('/', index);


//------------ Database Connection ------------//

var databaseURI = 'mongodb://localhost:27017/MEAN_SEED';


console.log('DB: ', databaseURI);
mongoose.connect(databaseURI);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connection open ', databaseURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose error connecting ', err);
});

//------------ Set Port & Start Server ------------//
app.set('port', process.env.PORT || 1234);
app.listen(app.get('port'), function() {
    console.log('listening on port: ', app.get('port'));
});
