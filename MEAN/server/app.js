const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
const cors = require('cors')
const app = express();
const errorController = require('./controllers/error.js')

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// app.use(function (req, res, next) { 
//     console.log(req.body) // populated!
// })


const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use('/admin',adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

app.listen(3000);
