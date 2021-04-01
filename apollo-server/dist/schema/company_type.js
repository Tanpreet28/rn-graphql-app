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
const Company = mongoose.model('company');
const EmployeeType = require("./employee_type");
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
            const regex = new RegExp(args.query);
            return Company.find({ name: { $regex: regex } });
        }
    },
    Mutation: {
        addCompany: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            return (new Company(args)).save();
        }),
    }
};
