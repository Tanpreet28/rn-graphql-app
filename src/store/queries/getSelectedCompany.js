import {gql} from '@apollo/client';

export const GET_SELECTED_COMPANY = gql`
  query getSelectedCompany {
    selectedCompany @client {
      id
      name
      description
      employees {
        id
        name
        age
      }
    }
  }
`;
