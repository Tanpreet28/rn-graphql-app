import gql from 'graphql-tag';

export const FETCH_COMPANIES = gql`
  query companies($query: String) {
    companies(query: $query) {
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
