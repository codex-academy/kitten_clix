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
}))

app.use(flash());
//setup handlebars
app.engine('hbs', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

const models = Models('mongodb://localhost/kitten_clix');
const kittenRoutes = KittenRoutes(models);

app.get('/', kittenRoutes.index);
app.get('/add', kittenRoutes.addScreen);
app.post('/add', kittenRoutes.add);

app.get('/like/:kittenName', kittenRoutes.like);

var port = process.env.PORT || 3007;
http.listen(port, function(){
    console.log('running at port :' , port)
});
