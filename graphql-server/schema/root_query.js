const graphql = require('graphql');
const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList} = graphql;
const CompanyType = require('./company_type');
const EmployeeType = require('./employee_type');
const mongoose = require('mongoose');
const { query } = require('express');
const Employee = mongoose.model('employee');
const Company = mongoose.model('company');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        employees: {
            type: new GraphQLList(EmployeeType),
            args: {
                query: {type: GraphQLString}
            },
            resolve(parentVal, args){
                console.log('employee list')
                const regex = new RegExp(args.query); 
                return Employee.find({name: {$regex: regex}});
            }
        },
        employee: {
            type: EmployeeType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentVal, args){
                return Employee.findById(args.id);
            }
        },
        companies: {
            type: new GraphQLList(CompanyType),
            args: {
                query: {type: GraphQLString}
            },
            resolve(parentVal, args){
                const regex = new RegExp(args.query); 
                return Company.find({name: {$regex: regex}});
            }
        },
    }
})

module.exports = RootQuery;