const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const swag_controller = require('./controllers/swag_controller')
const auth_controller = require('./controllers/auth_controller')
const cart_controller = require('./controllers/cart_controller')
const search_controller = require('./controllers/search_controller')
require('dotenv').config()

//middlewares
const checkForSession = require('./middlewares/checkForSession')

const app = express();
const port= 3000;

app.use( bodyParser.json());
app.use(session({
    secret: process.env.secret,
    saveUninitialized: true,
    resave:false
}))
app.use(checkForSession)

//Endpoints Swag
app.get('/api/swag', swag_controller.read)

//Endpoints Auth
app.post('/api/login', auth_controller.login)
app.post('/api/register', auth_controller.register)
app.post('/api/signout', auth_controller.signout)
app.get('/api/user', auth_controller.getUser    )

//Endpoints Cart
app.post('/api/cart', cart_controller.add)
app.post('/api/checkout', cart_controller.checkout)
app.delete('/api/delete', cart_controller.delete)

//Endpoints search
app.get('/api/search', search_controller.search)


app.listen( port, () => console.log("listening on port", port))