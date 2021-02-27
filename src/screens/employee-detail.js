import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/header';
import {List, Item, Button} from 'react-native-paper';
import CardComponent from '../components/card';
import Icon from 'react-native-vector-icons/FontAwesome';
import EmployeeItem from '../components/employee-item';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';
import {employeeDataVar} from '../store/cache';
import {FETCH_EMPLOYEES} from '../queries/fetchEmployees';
import Spinner from '../components/spinner';
import {localMutations} from '../store/operations';
import Snackbar from 'react-native-snackbar';
import DialogComponent from '../components/dialog';

const EmployeeDetail = ({
  id,
  name,
  company,
  age,
  phone,
  email,
  address,
  accountNumber,
  bankName,
  branchAddress,
  close,
  refetch,
}) => {
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDescription, setDialogDescription] = useState('');
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editEmployee] = useMutation(EDIT_EMPLOYEE);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
  let fields = {
    'Basic Details': {
      Name: name,
      Company: company,
      Age: age.toString(),
    },
    'Contact Information': {
      'Phone Number': phone,
      Email: email,
      Address: address,
    },
    'Bank Details': {
      'Bank Name': bankName,
      'Branch Address': branchAddress,
      'Account Number': accountNumber,
    },
  };

  const objectFromEntries = function (array) {
    let obj = {};
    if (array.length) {
      array.forEach(([key, value]) => {
        obj[key] = value;
      });
    }
    return obj;
  };
  const saveEmployeeData = () => {
    setLoading(true);
    let employeeData = employeeDataVar();
    employeeData['Contact Information'] = objectFromEntries(
      employeeData['Contact Information'],
    );
    employeeData['Bank Details'] = objectFromEntries(
      employeeData['Bank Details'],
    );
    editEmployee({
      variables: {
        id,
        phone: employeeData['Contact Information']['Phone Number'] || '',
        email: employeeData['Contact Information'].Email || '',
        address: employeeData['Contact Information'].Address || '',
        bankName: employeeData['Bank Details']['Bank Name'] || '',
        branchAddress: employeeData['Bank Details']['Branch Address'] || '',
        accountNumber: employeeData['Bank Details']['Account Number'] || '',
      },
    })
      .then(() => {
        Snackbar.show({
          text: 'Employee successfully updated',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'green',
          action: {
            text: 'CLOSE',
            onPress: () => {
              Snackbar.dismiss();
            },
          },
        });
        refetch();
        setLoading(false);
        close();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const deleteEvent = () => {
    setLoading(true);
    console.log(id);
    deleteEmployee({
      variables: {
        id,
      },
    })
      .then(() => {
        Snackbar.show({
          text: 'Employee successfully deleted',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'green',
          action: {
            text: 'CLOSE',
            onPress: () => {
              Snackbar.dismiss();
            },
          },
        });
        refetch();
        setLoading(false);
        close();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const openDeleteDialog = () => {
    setDialogTitle('Alert');
    setDialogDescription('Do you wish to delete this employee');
    setDialogVisibility(true);
  };

  const cancelDialog = () => {
    setDialogTitle('');
    setDialogDescription('');
    setDialogVisibility(false);
  };

  return (
    <View style={styles.detailContainer}>
      <Header
        title="Employee View"
        close={close}
        deleteEvent={openDeleteDialog}
      />
      <Spinner animating={loading} />
      <ScrollView>
        <EmployeeItem
          id={id + 'Basic Details'}
          title="Basic Details"
          fields={fields['Basic Details']}
          disabled="true"
          icon="account-details"
        />
        <EmployeeItem
          id={id + 'Contact Information'}
          title="Contact Information"
          fields={fields['Contact Information']}
          icon="contacts"
        />
        <EmployeeItem
          id={id + 'Bank Details'}
          title="Bank Details"
          fields={fields['Bank Details']}
          icon="bank"
        />
        <View style={styles.buttonContainer}>
          <Button
            compact="true"
            mode="contained"
            color="#fff"
            style={styles.button}
            onPress={close}>
            Cancel
          </Button>
          <Button
            compact="true"
            mode="contained"
            color="#24a0ed"
            labelStyle={styles.buttonText}
            style={styles.button}
            onPress={saveEmployeeData}>
            Submit
          </Button>
        </View>
      </ScrollView>
      {dialogVisibility && (
        <DialogComponent
          title={dialogTitle}
          description={dialogDescription}
          cancelDialog={cancelDialog}
          dialogEvent={deleteEvent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    marginBottom: 70,
  },
  icon: {
    width: 40,
    height: 40,
    fontSize: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
  },
  button: {
    width: 100,
  },
});

const EDIT_EMPLOYEE = gql`
  mutation EditEmployee(
    $id: String!
    $phone: String!
    $email: String!
    $address: String!
    $bankName: String!
    $branchAddress: String!
    $accountNumber: String!
  ) {
    editEmployee(
      id: $id
      phone: $phone
      email: $email
      address: $address
      bankName: $bankName
      branchAddress: $branchAddress
      accountNumber: $accountNumber
    ) {
      id
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: String!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;
export default EmployeeDetail;
