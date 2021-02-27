import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../components/header';
import {List} from 'react-native-paper';
import CardComponent from '../components/card';
import Icon from 'react-native-vector-icons/FontAwesome';

const CompanyDetail = ({id, name, description, employees, close}) => {
  return (
    <View>
      <Header title={name} close={close} />
      <CardComponent
        description={description}
        image={true}
        childStyle={{marginHorizontal: 0, marginTop: 0}}
        titleStyle={{textAlign: 'center', marginRight: 20}}
      />
      <List.Section>
        {employees.map((item) => {
          return (
            <CardComponent
              key={item.id}
              title={item.name}
              subtitle={'Age:   ' + item.age}
              icon="account-circle"
            />
          );
        })}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    fontSize: 30,
  },
});
export default CompanyDetail;
