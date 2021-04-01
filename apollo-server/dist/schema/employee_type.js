"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typedef = void 0;
const CompanyType = require('./company_type');
const mongoose = require('mongoose');
const Employee = mongoose.model('employee');
const Company = mongoose.model('company');
exports.typedef = `
    type EmployeeType {
        id: String, 
        name: String, 
        age: Int,
        phone: String, 
        email: String, 
        address: String, 
        bankName: String, 
        branchAddress: String, 
        accountNumber: String, 
        company: CompanyType
    }
`;
exports.resolvers = {
    Query: {
        employees: (parent, args, context, info) => {
            const regex = new RegExp(args.query);
            return Employee.find({ name: { $regex: regex } });
        },
        employee: (parent, args, context, info) => {
            return Employee.findById(args.id);
        },
    },
    Mutation: {
        addEmployee: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            const employee = new Employee(args);
            yield Company.findOneAndUpdate({ name: args.company }, {
                $push: { "employees": employee }
            });
            let company = (yield Company.findOne({ name: args.company }));
            employee.company = company;
            return employee.save();
        }),
        editEmployee: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, phone, email, address, bankName, branchAddress, accountNumber } = args;
            yield Employee.findByIdAndUpdate(id, {
                $set: { phone, email, address, bankName, branchAddress, accountNumber }
            });
            let emp = Employee.findById(id);
            return emp;
        }),
        deleteEmployee: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            let employee = yield Employee.findById(args.id);
            console.log(employee, args.id);
            let company = yield Company.findById(employee.company);
            company.employees = company.employees.filter((emp) => emp.id !== employee.id);
            company.save();
            yield Employee.findByIdAndDelete(args.id);
            return employee;
        })
    }
};
