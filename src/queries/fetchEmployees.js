import gql from 'graphql-tag';

export const FETCH_EMPLOYEES = gql`
  query employees($query: String) {
    employees(query: $query) {
      name
      id
      age
      company {
        name
      }
      phone
      email
      address
      accountNumber
      bankName
      branchAddress
    }
  }
`;
