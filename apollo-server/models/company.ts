// const mongoose = require('mongoose');
import * as mongoose from 'mongoose';
const schema = mongoose.Schema;
const EmployeeSchema = require('./employee');

const CompanySchema = new schema({
    name: {type: String},
    description: {type: String},
    employees: [EmployeeSchema]
})

mongoose.model('company', CompanySchema);

module.exports = CompanySchema;