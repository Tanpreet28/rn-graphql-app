const PROTO_PATH = __dirname + '/employee.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

let employee_proto = grpc.loadPackageDefinition(packageDefinition);

console.log('client')
let client = new employee_proto.EmployeeService('localhost:5000', grpc.credentials.createInsecure());

module.exports = client;