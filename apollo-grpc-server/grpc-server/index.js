require('./mongoConnection');
const mongoose = require('mongoose');
const Company = mongoose.model('company');
const Employee = mongoose.model('employee');
const PROTO_PATH = __dirname + '/employee.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

let employee_proto = grpc.loadPackageDefinition(packageDefinition);

// const getEmployees = (call, callback) => {
//     let employees = [{name: "Tanpreet Kaur"}]
//     callback({
//         data: employees
//     })
// }

let server = new grpc.Server();
server.addService(employee_proto.EmployeeService.service, {
    employees: async (call, callback) => {
        // const regex = new RegExp(args.query); 
        let employees = await Employee.find({});
        callback(null, {employees})
    },
    employee: async (call, callback) => {
        let employee = await Employee.findById(call.id);
        callback(null, {employee})
    },
    addEmployee: async (call, callback) => {
        const employee = new Employee(call.request);
        let company = (await Company.findOne({name: call.request.company}));
        employee.company = company;
        await Company.findOneAndUpdate({name: call.request.company}, {
            $push: {"employees": employee}
        })
        await employee.save();
        callback(null, {})
    },
    editEmployee: async (args, callback) => {
        const {id, phone, email, address, bankName, branchAddress, accountNumber} = args;
        await Employee.findByIdAndUpdate(id, {
            $set: {phone, email, address, bankName, branchAddress, accountNumber}
        })
        let emp = Employee.findById(id);
        callback(null, emp)
    },
    deleteEmployee: async (args, callback) => {
        let employee = await Employee.findById(args.id);
        console.log(employee, args.id)
        let company =  await Company.findById(employee.company);
        company.employees = company.employees.filter((emp) => emp.id !== employee.id);
        company.save();
        await Employee.findByIdAndDelete(args.id);
        callback(null, employee)
    },
    companies: async (args, callback) => {
        // const regex = new RegExp(args.query); 
        let companies = await Company.find({});
        console.log(companies[0]);
        callback(null, {companies})
    },
    addCompany: async (call, callback) => {
        // const regex = new RegExp(args.query); 
        let company = await (new Company(call.request)).save();
        console.log(company);
        callback(null, {company})
    },
});
server.bind('localhost:5000', grpc.ServerCredentials.createInsecure());
server.start();
