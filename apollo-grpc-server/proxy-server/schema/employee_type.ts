const CompanyType = require('./company_type');
const mongoose = require('mongoose');
const grpcClient = require('../grpc/client');

export const typedef = `
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

export const resolvers = {
    Query: {
        employees: async (parent, args, context, info) => {
            return new Promise((resolve, reject) => {
                grpcClient.employees({}, (err, res) => {
                    console.log(err)
                    if(err){
                        reject("Error occurred!!");
                    }
                    resolve(res.employees);
                });
            })
        },
        employee: (parent, args, context, info) => {
            // return Employee.findById(args.id);
            return new Promise((resolve, reject) => {
                grpcClient.employee(args, (err, res) => {
                    console.log(err)
                    if(err){
                        reject("Error occurred!!");
                    }
                    resolve(res.employee);
                });
            })
        },
    },
    Mutation: {
        addEmployee: async (parent, args, context, info) => {
            console.log('args', args)
            return new Promise((resolve, reject) => {
                grpcClient.addEmployee({...args}, (err, res) => {
                    console.log(err)
                    if(err){
                        reject("Error occurred!!");
                    }
                    console.log(res)
                    resolve({data: 'successfully saved!!'});
                });
            })
        },
        editEmployee: async (parent, args, context, info) => {
            return new Promise((resolve, reject) => {
                grpcClient.editEmployee(args, (err, res) => {
                    console.log(err)
                    if(err){
                        reject("Error occurred!!");
                    }
                    resolve(res);
                });
            })
        },
        deleteEmployee: async (parent, args, context, info) => {
            return new Promise((resolve, reject) => {
                grpcClient.deleteEmployee(args, (err, res) => {
                    console.log(err)
                    if(err){
                        reject("Error occurred!!");
                    }
                    resolve(res);
                });
            })
        }
    }
}
