"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require('mongoose');
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const EmployeeSchema = require('./employee');
const CompanySchema = new schema({
    name: { type: String },
    description: { type: String },
    employees: [EmployeeSchema]
});
mongoose.model('company', CompanySchema);
