"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
// const EmployeeType = require('./schema/employee_type');
// Setting mongoose connection and using mongoose
const mongoose = require('mongoose');
const config_1 = require("./config");
const uri = `mongodb+srv://${config_1.default.USERNAME}:${config_1.default.PASSWORD}@mflix.relsz.mongodb.net/${config_1.default.DB}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const models = require('./models');
const Employee = mongoose.model('employee');
const Company = mongoose.model('company');
const employee_type_1 = require("./schema/employee_type");
const company_type_1 = require("./schema/company_type");
const app = express();
const typeDefs = `
    type Query {
        employees(query: String): [EmployeeType],
        employee(id: String): EmployeeType,
        companies(query: String): [CompanyType]
    }
    type Mutation {
        addEmployee(name: String, age: Int, company: String): EmployeeType
        addCompany(name: String, description: String): CompanyType
        editEmployee(id: String!, phone: String, email: String, address: String, bankName: String, branchAddress: String, accountNumber: String): EmployeeType
        deleteEmployee(id: String): EmployeeType
    }
`;
const server = new ApolloServer({ typeDefs: [typeDefs, employee_type_1.typedef, company_type_1.typedef], resolvers: [employee_type_1.resolvers, company_type_1.resolvers] });
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};
app.use(cors(corsOptions));
server.applyMiddleware({ app });
app.listen({ port: 3000 }, () => console.log(`🚀 Server ready at http://localhost:3000`));
