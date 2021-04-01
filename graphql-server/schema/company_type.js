const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;
const EmployeeType = require('./employee_type');
const mongoose = require('mongoose');
const Employee = mongoose.model('employee');

console.log('here')
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        employees: {
            type: new GraphQLList(EmployeeType)
        }
    })
})

module.exports = CompanyType;