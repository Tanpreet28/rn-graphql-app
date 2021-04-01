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
const grpcClient = require('../grpc/client');
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
        employees: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                grpcClient.employees({}, (err, res) => {
                    console.log(err);
                    if (err) {
                        reject("Error occurred!!");
                    }
                    resolve(res.employees);
                });
            });
        }),
        employee: (parent, args, context, info) => {
            // return Employee.findById(args.id);
            return new Promise((resolve, reject) => {
                grpcClient.employee(args, (err, res) => {
                    console.log(err);
                    if (err) {
                        reject("Error occurred!!");
                    }
                    resolve(res.employee);
                });
            });
        },
    },
    Mutation: {
        addEmployee: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('args', args);
            return new Promise((resolve, reject) => {
                grpcClient.addEmployee(Object.assign({}, args), (err, res) => {
                    console.log(err);
                    if (err) {
                        reject("Error occurred!!");
                    }
                    console.log(res);
                    resolve({ data: 'successfully saved!!' });
                });
            });
        }),
        editEmployee: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                grpcClient.editEmployee(args, (err, res) => {
                    console.log(err);
                    if (err) {
                        reject("Error occurred!!");
                    }
                    resolve(res);
                });
            });
        }),
        deleteEmployee: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                grpcClient.deleteEmployee(args, (err, res) => {
                    console.log(err);
                    if (err) {
                        reject("Error occurred!!");
                    }
                    resolve(res);
                });
            });
        })
    }
};
