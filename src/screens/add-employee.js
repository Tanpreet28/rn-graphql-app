import React, {Component, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput, Menu} from 'react-native-paper';
import Header from '../components/header';
import {Button} from 'react-native-paper';
import {useQuery, useMutation} from '@apollo/client';
import gql from 'graphql-tag';
import {FETCH_EMPLOYEES} from '../queries/fetchEmployees';
import Snackbar from 'react-native-snackbar';
import {FETCH_COMPANIES} from '../queries/fetchCompanies';
import {Picker} from '@react-native-picker/picker';

const AddEmployee = ({navigation}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [company, setCompany] = useState('Please select a company');
  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [
      {
        query: FETCH_EMPLOYEES,
      },
    ],
  });

  const {data, loading} = useQuery(FETCH_COMPANIES, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  let companies = data ? data.companies : [];

  const addEmployeeEvent = () => {
    addEmployee({
      variables: {
        name,
        age: parseInt(age),
        company,
      },
    }).then(() => {
      setName('');
      setAge('');
      setCompany('');
      navigation.navigate('Employee List');
      Snackbar.show({
        text: 'Employee successfully added',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'green',
        action: {
          text: 'CLOSE',
          onPress: () => {
            Snackbar.dismiss();
          },
        },
      });
    });
  };

  return (
    <View>
      <Header title={'Add Employee'} />
      <View style={styles.container}>
        <TextInput
          label="Employee Name"
          value={name}
          mode={'outlined'}
          style={styles.input}
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          label="Age"
          value={age}
          mode={'outlined'}
          style={styles.input}
          onChangeText={(value) => setAge(value)}
        />
        <View style={styles.dropdown}>
          <Picker
            selectedValue={company}
            onValueChange={(itemValue, itemIndex) => setCompany(itemValue)}>
            <Picker.Item
              label="Please select a company"
              value="Please select a company"
            />
            {companies.map((company) => {
              return (
                <Picker.Item
                  key={company.id}
                  label={company.name}
                  value={company.name}
                />
              );
            })}
          </Picker>
        </View>
        <Button
          mode="contained"
          onPress={addEmployeeEvent}
          style={styles.Button}>
          Add new employee
        </Button>
      </View>
    </View>
  );
};

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($name: String!, $age: Int, $company: String!) {
    addEmployee(name: $name, age: $age, company: $company) {
      id
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginVertical: 15,
  },
  dropdown: {
    paddingTop: 2,
    marginVertical: 15,
    height: 57,
    borderRadius: 5,
    borderWidth: 0.6,
  },
  Button: {
    marginTop: 30,
    elevation: 0,
  },
});

export default AddEmployee;
