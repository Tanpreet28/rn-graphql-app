export default function createSetEmployee(
  selectedEmployeeVar,
  employeeDataVar,
) {
  return (selectedEmployee) => {
    selectedEmployeeVar(selectedEmployee);
    const {
      phone,
      email,
      address,
      accountNumber,
      bankName,
      branchAddress,
    } = selectedEmployee;
    employeeDataVar({
      'Contact Information': [
        ['Phone Number', phone],
        ['Email', email],
        ['Address', address],
      ],
      'Bank Details': [
        ['Bank Name', bankName],
        ['Branch Address', branchAddress],
        ['Account Number', accountNumber],
      ],
    });
  };
}
