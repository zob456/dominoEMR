import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack'
import { Text, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { firebaseAuth } from './firebase/config';

import { appStyles } from './styles/index'

import Login from './components/Login'


const App = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  // const Stack = createStackNavigator();
  const signIn = (email: string, password: string) => {
    firebaseAuth.signInWithEmailAndPassword(email, password)
  }

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const client = new ApolloClient({
    cache: new InMemoryCache()
  });

  useEffect(() => {
    const subscriber = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Login signIn={signIn} />
      </View>
    );
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <View style={appStyles.root}>
          <Text>Your are logged in</Text>
        </View>
      </NavigationContainer>
    </ApolloProvider>
  );
};


export default App;