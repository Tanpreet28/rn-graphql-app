import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import EmployeeList from './employee-list';
import CompanyList from './company-list';
import AddCompany from './add-company';
import AddEmployee from './add-employee';
import {LogHistory} from './log-history';
const Drawer = createDrawerNavigator();

class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Employee List"
          screenOptions={{unmountOnBlur: true}}>
          <Drawer.Screen name="Employee List" component={EmployeeList} />
          <Drawer.Screen name="Company List" component={CompanyList} />
          <Drawer.Screen name="Add Company" component={AddCompany} />
          <Drawer.Screen name="Add Employee" component={AddEmployee} />
          <Drawer.Screen name="Settings" component={LogHistory} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
