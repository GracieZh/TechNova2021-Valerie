
import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render } from 'react-dom';


export default function Homepage(props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0093E9', '#80D0C7']}
        style={styles.background}
      />
      <Image style={styles.logo} source={require('../assets/icon.png')} />
      <Text style={styles.title}>Valerie</Text>
      <Text style={styles.paragraph}>
        Your wellness matters.
      </Text>
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#8EC5FC',

    position: 'absolute',
    top:0,
    right:0,
    bottom:0,
    left:0,
    
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  title: {
    margin: 24,
    marginTop: 0,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    marginBottom: 40,
    fontSize: 15,
    //fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  logo: {
    height: 128,
    width: 128,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0093E9",
    paddingVertical: 10,
    paddingHorizontal: 30, 
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  }
});
