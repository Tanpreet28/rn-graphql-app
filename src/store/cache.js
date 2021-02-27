import {InMemoryCache, makeVar} from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        selectedCompany: {
          read() {
            return selectedCompanyVar();
          },
        },
        selectedEmployee: {
          read() {
            return selectedEmployeeVar();
          },
        },
        employeeData: {
          read() {
            return employeeDataVar();
          },
        },
        employees: {
          merge(existing = [], incoming) {
            return {...existing, ...incoming};
          },
        },
      },
    },
  },
});

export const selectedCompanyVar = makeVar({});
export const selectedEmployeeVar = makeVar({});
export const employeeDataVar = makeVar();
export const snackbarVar = makeVar({visible: false, title: ''});
