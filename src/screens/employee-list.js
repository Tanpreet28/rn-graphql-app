import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Card from '../components/card';
import {useQuery} from '@apollo/client';
import Header from '../components/header';
import {FETCH_EMPLOYEES} from '../queries/fetchEmployees';
import Spinner from '../components/spinner';
import SearchbarComponent from '../components/searchbar';
import EmployeeDetail from './employee-detail';
import {GET_SELECTED_EMPLOYEE} from '../store/queries/getSelectedEmployee';
import {localMutations} from '../store/operations/index';

const EmployeeList = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {data, loading, refetch} = useQuery(FETCH_EMPLOYEES, {
    variables: {query: searchQuery},
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });
  const getEmployeeResult = useQuery(GET_SELECTED_EMPLOYEE);
  const selectedEmployee = getEmployeeResult?.data?.selectedEmployee;
  const {setEmployee, setCompany, setEmployeeData} = localMutations;
  setCompany({});

  let employees = [];

  if (!loading) {
    employees = data.employees;
  }

  const addEmployee = () => {
    navigation.navigate('Add Employee');
  };

  const navigateToCompanyList = () => {
    navigation.navigate('Company List');
  };

  const searchEmployee = (query) => {
    setSearchQuery(query);
  };

  const closeEmployeeDetail = () => {
    setEmployee({});
    setSearchQuery('');
    setEmployeeData({
      'Contact Information': [],
      'Bank Details': [],
    });
  };

  return (
    <View style={styles.container}>
      {selectedEmployee ? (
        <EmployeeDetail
          name={selectedEmployee.name}
          age={selectedEmployee.age}
          company={selectedEmployee.company.name}
          phone={selectedEmployee.phone}
          email={selectedEmployee.email}
          address={selectedEmployee.address}
          accountNumber={selectedEmployee.accountNumber}
          bankName={selectedEmployee.bankName}
          branchAddress={selectedEmployee.branchAddress}
          navigation={navigation}
          id={selectedEmployee.id}
          close={closeEmployeeDetail}
          refetch={refetch}
        />
      ) : (
        <View style={styles.list}>
          <Header title={'Employee List'} add={addEmployee} />
          <SearchbarComponent onSearch={searchEmployee} />
          {!loading ? (
            <FlatList
              data={employees}
              renderItem={({item}) => (
                <Card
                  key={item._id}
                  title={item.name}
                  subtitle={item.company.name}
                  add={addEmployee}
                  icon={'human-greeting'}
                  clickCard={() => setEmployee(item)}
                />
              )}
            />
          ) : (
            <View>
              <Spinner animating={loading} />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginBottom: 120,
  },
});
export default EmployeeList;
