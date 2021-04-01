const graphql = require('graphql');
const {GraphQLSchema} = graphql;
const RootQuery = require('./root_query');
const mutation = require('./mutation');

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})