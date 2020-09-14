import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack'
import { Text, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { firebaseAuth } from './firebase/config';

import { appStyles } from './styles/index'

import Login from './components/Login'
import Schedule from './components/Schedule'


const App = () => {


  const link = new HttpLink({
    uri: `http://10.0.2.2:5000/`,
  });

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
    link: link,
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
          <Schedule />
        </View>
      </NavigationContainer>
    </ApolloProvider>
  );
};


export default App;