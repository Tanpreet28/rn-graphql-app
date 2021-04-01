const graphql = require('graphql');
const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList} = graphql;
const CompanyType = require('./company_type');
const EmployeeType = require('./employee_type');
const mongoose = require('mongoose');
const Company = mongoose.model('company');
const Employee = mongoose.model('employee');


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                company: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLInt}
            },
            async resolve(parentVal, args){
                const employee = new Employee(args);
                await Company.findOneAndUpdate({name: args.company}, {
                    $push: {"employees": employee}
                })
                let company = (await Company.findOne({name: args.company}));
                employee.company = company._id;
                return employee.save();
            }
        },
        addCompany: {
            type: CompanyType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentVal, args){
                console.log(args)
                return (new Company(args)).save();
            }
        },
        editEmployee: {
            type: EmployeeType,
            args: {
                id: {type: GraphQLString},
                phone: {type: GraphQLString},
                email: {type: GraphQLString},
                address: {type: GraphQLString},
                bankName: {type: GraphQLString},
                branchAddress: {type: GraphQLString},
                accountNumber: {type: GraphQLString},
            },
            async resolve(parentVal, args){
                console.log(args)
                const {id, phone, email, address, bankName, branchAddress, accountNumber} = args;
                await Employee.findByIdAndUpdate(id, {
                    $set: {phone, email, address, bankName, branchAddress, accountNumber}
                })
                let emp = Employee.findById(id);
                return emp;
            }
        },
        deleteCompany: {
            type: CompanyType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parentVal, args){
                await Company.findByIdAndDelete(id);
            }
        },
        deleteEmployee: {
            type: EmployeeType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parentVal, args){
                let employee = await Employee.findById(args.id);
                let company =  await Company.findById(employee.company);
                company.employees = company.employees.filter((emp) => emp.id !== employee.id);
                company.save();
                await Employee.findByIdAndDelete(args.id);
                return args.id;
            }
        }
    }
})

module.exports = mutation;