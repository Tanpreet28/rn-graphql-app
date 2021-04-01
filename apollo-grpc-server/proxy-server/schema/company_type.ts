const mongoose = require('mongoose');
const grpcClient = require('../grpc/client');


export const typedef = `
    type CompanyType {
    id: String,
    name: String,
    description: String,
    employees: [EmployeeType]
    }
`;


export const resolvers = {
    Query: {
        companies: (parent, args, context, info) => {
            return new Promise((resolve, reject) => {
                grpcClient.companies({}, (err, res) => {
                    console.log(err)
                    if(err){
                        reject("Error occurred!!");
                    }
                    console.log(res.companies[0])
                    resolve(res.companies);
                });
            })
        }
    },
    Mutation: {
        addCompany: async (parent, args, context, info) => {
            console.log(args)
            return new Promise((resolve, reject) => {
                grpcClient.addCompany({...args}, (err, res) => {
                    console.log(err)
                    if(err){
                        reject("Error occurred!!");
                    }
                    resolve(res);
                });
            })
        },
    }
}