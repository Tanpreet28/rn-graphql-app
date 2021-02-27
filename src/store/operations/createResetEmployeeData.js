export default function createResetEmployeeData(employeeDataVar) {
  return () => {
    employeeDataVar({
      'Contact Information': [],
      'Bank Details': [],
    });
  };
}
