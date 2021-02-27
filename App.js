import React from 'react';
import Navigator from './src/screens/navigator';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {ApolloProvider} from '@apollo/client';
import {ApolloClient} from '@apollo/client';
import {HttpLink} from 'apollo-link-http';
import {cache} from './src/store/cache';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF7F50',
    accent: 'yellow',
  },
  animation: {
    scale: 1.0,
  },
};

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://10.0.2.2:3000/graphql',
  }),
});

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    </PaperProvider>
  );
};

export default App;
