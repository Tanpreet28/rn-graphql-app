import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Text, ScrollView} from 'react-native';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/client';
import Card from '../components/card';
import Header from '../components/header';
import {FETCH_COMPANIES} from '../queries/fetchCompanies';
import SearchbarComponent from '../components/searchbar';
import {GET_SELECTED_COMPANY} from '../store/queries/getSelectedCompany';
import {localMutations} from '../store/operations/index';
import Spinner from '../components/spinner';
import CompanyDetail from './company-detail';
import {selectedCompanyVar} from '../store/cache';

const CompanyList = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {data, loading} = useQuery(FETCH_COMPANIES, {
    variables: {query: searchQuery},
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
  const getCompanyResult = useQuery(GET_SELECTED_COMPANY);
  const selectedCompany = getCompanyResult?.data?.selectedCompany;
  const {setCompany, setEmployee} = localMutations;
  const companies = data ? data.companies : [];
  setEmployee({});

  const addCompany = () => {
    navigation.navigate('Add Company');
  };

  const navigateToEmployeeList = () => {
    navigation.navigate('Employee List');
  };

  const searchCompany = (query) => {
    setSearchQuery(query);
  };

  const closeCompanyDetail = () => {
    setCompany({});
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      {selectedCompany ? (
        <CompanyDetail
          name={selectedCompany.name}
          description={selectedCompany.description}
          employees={selectedCompany.employees}
          navigation={navigation}
          close={closeCompanyDetail}
        />
      ) : (
        <View>
          <Header title={'Company List'} add={addCompany} />
          <SearchbarComponent onSearch={searchCompany} />
          {!loading ? (
            <FlatList
              data={companies}
              renderItem={({item}) => (
                <Card
                  key={item.id}
                  title={item.name}
                  description={item.description}
                  clickCard={() => setCompany(item)}
                  icon={'office-building'}
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
    marginBottom: 120,
  },
});
export default CompanyList;
