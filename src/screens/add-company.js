import React, {Component, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Header from '../components/header';
import {Button} from 'react-native-paper';
import {useMutation} from '@apollo/client';
import gql from 'graphql-tag';
import {FETCH_COMPANIES} from '../queries/fetchCompanies';
import {localMutations} from '../store/operations/index';
import Snackbar from 'react-native-snackbar';

const AddCompany = ({navigation}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [addCompany] = useMutation(ADD_COMPANY, {
    refetchQueries: [
      {
        query: FETCH_COMPANIES,
      },
    ],
  });

  const addCompanyEvent = () => {
    addCompany({
      variables: {
        name,
        description,
      },
    }).then(() => {
      setName('');
      setDescription('');
      navigation.navigate('Company List');
      Snackbar.show({
        text: 'Company successfully added',
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
      <Header title={'Add Company'} />
      <View style={styles.container}>
        <TextInput
          label="Company Name"
          value={name}
          mode={'outlined'}
          style={styles.input}
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          label="Description"
          value={description}
          mode={'outlined'}
          style={styles.input}
          onChangeText={(value) => setDescription(value)}
        />
        <Button
          mode="contained"
          onPress={addCompanyEvent}
          style={styles.Button}>
          Add new company
        </Button>
      </View>
    </View>
  );
};

const ADD_COMPANY = gql`
  mutation AddCompany($name: String!, $description: String!) {
    addCompany(name: $name, description: $description) {
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
  Button: {
    marginTop: 30,
  },
});

export default AddCompany;
