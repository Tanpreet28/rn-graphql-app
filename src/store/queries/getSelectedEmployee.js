import {gql} from '@apollo/client';

export const GET_SELECTED_EMPLOYEE = gql`
  query getSelectedEmployee {
    selectedEmployee @client {
      id
      name
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
