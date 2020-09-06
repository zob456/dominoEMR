import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { appStyles } from './styles/index'


const App: FC = () => {
  const client = new ApolloClient({
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <View style={appStyles.root}>
          <Text style={appStyles.greeting}>
            Test
      </Text>
        </View>
      </NavigationContainer>
    </ApolloProvider>
  );
};

// styles


export default App;