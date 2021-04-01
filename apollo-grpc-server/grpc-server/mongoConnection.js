// Setting mongoose connection and using mongoose
const mongoose = require('mongoose');
const config = require('./config');
const uri = `mongodb+srv://${config.USERNAME}:${config.PASSWORD}@mflix.relsz.mongodb.net/${config.DB}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const models = require('./models');
const Employee = mongoose.model('employee');
const Company = mongoose.model('company');