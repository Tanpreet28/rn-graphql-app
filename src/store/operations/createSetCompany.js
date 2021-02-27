export default function createSetCompany(selectedCompanyVar) {
  return (selectedCompany) => {
    selectedCompanyVar(selectedCompany);
  };
}

// todosVar(value) setting value
// todosVar() getting value
