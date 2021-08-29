
import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render } from 'react-dom';

import AudRecorder from '../components/audioRecorder';

export default function BotNav(props) {
  return (
    <View style={styles.container}>
        <AudRecorder />
        {/*<View style={styles.left}>
            <Text style={styles.title}>Option1</Text>
        </View>
        <View style={styles.mid}>
            <Text style={styles.title}>Option2</Text>
        </View>
        <View style={styles.right}>
            <Text style={styles.title}>Option3</Text>
        </View>
        */}
    </View>
  )
}
const pad = 35
const styles = StyleSheet.create({
    
    container: {
        //paddingTop: 15,
        backgroundColor: 'white',
        position: 'absolute',
        right:0,
        bottom:0,
        left:0,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
        
    },    
  left: {
    paddingLeft: pad,
    paddingRight: pad
  },
  mid: {
    paddingLeft: pad,
    paddingRight: pad
  },
  right: {
    paddingLeft: pad,
    paddingRight: pad
  },
  title: {

  }
});
