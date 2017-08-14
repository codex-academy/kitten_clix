const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const mongoose = require('mongoose');
const KittenRoutes = require('./kitten-routes');
const UserRoutes = require('./user-routes');
const Models = require('./models');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
  secret: '@pp Factori3',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next){
    if (req.session.username){
        res.locals.username = req.session.username;
    }
    next();
});

app.use(flash());
//setup handlebars
app.engine('hbs', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

const models = Models('mongodb://localhost/kitten_clix');
const kittenRoutes = KittenRoutes(models);
const userRoutes = UserRoutes(models);

app.get('/', kittenRoutes.index);
app.get('/add', kittenRoutes.addScreen);
app.post('/add', kittenRoutes.add);

app.get('/like/:kittenName', kittenRoutes.like);

app.get("/login", userRoutes.loginScreen);
app.post("/login", userRoutes.login);
app.get("/logout", userRoutes.logout);

var port = process.env.PORT || 3007;
http.listen(port, function(){
    console.log('running at port :' , port)
});
