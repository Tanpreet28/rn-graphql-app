export default function createSetEmployeeData(employeeDataVar) {
  return (title, data) => {
    console.log(title, data);
    let employeeData = employeeDataVar();
    employeeData[title] = data;
    employeeDataVar(employeeData);
  };
}
