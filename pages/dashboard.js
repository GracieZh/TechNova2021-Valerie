
import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render } from 'react-dom';

import BotNav from '../components/botNav';
import Bot from '../components/robot';
import Messages from '../components/messages';
import AudioPlayer from '../components/audioPlayer';

export default function Dashboard(props) {
  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text style={styles.buttonText}>Test</Text>
      </TouchableOpacity>
      
      <Bot />
      <Messages />
      <BotNav />
      <AudioPlayer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    position: 'absolute',
    top:0,
    right:0,
    bottom:0,
    left:0,
  },
  button: {
    backgroundColor: "#42B2DF",
    paddingVertical: 10,
    paddingHorizontal: 30, 
    borderRadius: 5,
    width: 90
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  }
});
