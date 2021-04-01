const graphql = require('graphql');
const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList} = graphql;
const mongoose = require('mongoose');
const Company = mongoose.model('company');

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        phone: {type: GraphQLString},
        email: {type: GraphQLString},
        address: {type: GraphQLString},
        bankName: {type: GraphQLString},
        branchAddress: {type: GraphQLString},
        accountNumber: {type: GraphQLString},
        company: {
            type: require('./company_type'),
            resolve(parentValue, args){
                return Company.findById(parentValue.company);
            }
        }
    })
})

module.exports = EmployeeType;