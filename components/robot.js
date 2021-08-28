
import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render } from 'react-dom';


export default function Dashboard(props) {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/bot/normal.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#B8EBD0',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
});
