import {
  selectedCompanyVar,
  selectedEmployeeVar,
  employeeDataVar,
  snackbarVar,
} from '../cache';
import createSetCompany from './createSetCompany';
import createSetEmployee from './createSetEmployee';
import createSetEmployeeData from './createSetEmployeeData';
import createResetEmployeeData from './createResetEmployeeData';

export const localMutations = {
  setCompany: createSetCompany(selectedCompanyVar),
  setEmployee: createSetEmployee(selectedEmployeeVar, employeeDataVar),
  setEmployeeData: createSetEmployeeData(employeeDataVar),
  resetEmployeeData: createResetEmployeeData(),
};
