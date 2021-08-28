import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homepage from './pages/homepage';
import Dashboard from './pages/dashboard';
import Test from './pages/testing';

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/icon-blue.png')}
    />
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Homepage onPress={() => navigation.navigate('Dashboard')} />
      <StatusBar style="auto" />
    </View>
  );
}

function DashboardScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Dashboard onPress={() => navigation.navigate('Testing')} />
    </View>
  );
}

function TestingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Test />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  //SplashScreen.preventAutoHideAsync();
  //setTimeout(SplashScreen.hideAsync, 5000);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="Dashboard" component={DashboardScreen} theme={DarkTheme} options={{ headerBackVisible: false , headerTitle: props => <LogoTitle />}} />
        <Stack.Screen name="Testing" component={TestingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
