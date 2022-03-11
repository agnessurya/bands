const express = require('express')
const app = express()
const routes = require('./routes');

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(routes);


module.exports = app