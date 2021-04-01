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
const mongoose = require('mongoose');
const grpcClient = require('../grpc/client');
exports.typedef = `
    type CompanyType {
    id: String,
    name: String,
    description: String,
    employees: [EmployeeType]
    }
`;
exports.resolvers = {
    Query: {
        companies: (parent, args, context, info) => {
            return new Promise((resolve, reject) => {
                grpcClient.companies({}, (err, res) => {
                    console.log(err);
                    if (err) {
                        reject("Error occurred!!");
                    }
                    console.log(res.companies[0]);
                    resolve(res.companies);
                });
            });
        }
    },
    Mutation: {
        addCompany: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(args);
            return new Promise((resolve, reject) => {
                grpcClient.addCompany(Object.assign({}, args), (err, res) => {
                    console.log(err);
                    if (err) {
                        reject("Error occurred!!");
                    }
                    resolve(res);
                });
            });
        }),
    }
};
