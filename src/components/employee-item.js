import React, {Component, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, Avatar, Button} from 'react-native-paper';
import {TextInputComponent} from './textInput';
import {localMutations} from '../store/operations/index';

const EmployeeItem = ({id, title, icon, fields, disabled}) => {
  const {setEmployeeData} = localMutations;
  let [formData, setFormData] = useState(Object.entries(fields));

  const changeFieldText = (label, val) => {
    setFormData(
      formData.map(([key, value]) => {
        if (key === label) {
          return [key, val];
        } else {
          return [key, value];
        }
      }),
    );
  };

  const resetForm = () => {
    let updatedData = formData.map(([key, value]) => {
      return [key, ''];
    });
    setFormData(updatedData);
    setEmployeeData(title, updatedData);
  };

  return (
    <Card style={styles.container} elevation={2}>
      <Card.Title
        title={title}
        right={(props) => <Avatar.Icon icon={icon} size={35} />}
        rightStyle={{marginRight: 20}}
      />
      <Card.Content>
        {formData.map(([key, value]) => {
          return (
            <TextInputComponent
              key={key}
              label={key}
              value={value}
              disabled={disabled}
              changeFieldText={(label, val) => changeFieldText(label, val)}
            />
          );
        })}
        <Card.Actions style={styles.action}>
          <Button
            compact="true"
            mode="contained"
            color="#fff"
            style={styles.button}
            disabled={disabled}
            onPress={resetForm}>
            Reset
          </Button>
          <Button
            compact="true"
            mode="contained"
            labelStyle={styles.buttonText}
            style={styles.button}
            disabled={disabled}
            onPress={() => setEmployeeData(title, formData)}>
            Save
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    marginHorizontal: 20,
    marginTop: 30,
  },
  icon: {
    width: 40,
    height: 40,
    fontSize: 30,
  },
  title: {
    padding: 0,
    // backgroundColor: 'red',
  },
  action: {
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#fff',
  },
  button: {
    width: 100,
  },
});
export default EmployeeItem;
