const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: {type: String},
  age: {type: Number},
  company: {type: String},
  phone: {type: String},
  email: {type: String},
  address: {type: String},
  bankName: {type: String},
  branchAddress: {type: String},
  accountNumber: {type: String},
})

mongoose.model('employee', EmployeeSchema);

module.exports = EmployeeSchema;