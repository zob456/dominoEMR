import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { firebaseAuth } from './firebase/config';

import { appStyles } from './styles/index'

import Login from './components/Login'
import Schedule from './components/Schedule'
import Medications from './components/Medications'


const App = () => {
  const Tab = createBottomTabNavigator();


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
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            tabStyle: {
              height: 30,
            }
          }}>
          <Tab.Screen name="Appointments" component={Schedule} />
          <Tab.Screen name="Medications" component={Medications} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};


export default App;