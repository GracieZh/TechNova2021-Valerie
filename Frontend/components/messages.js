
import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Button, ScrollView, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render } from 'react-dom';
import Constants from 'expo-constants';

const NO_WIDTH_SPACE = '​';

const highlight = string =>
string.split(' ').map((word, i) => (
  <Text key={i}>
    <Text style={styles.highlighted}>{word} </Text>
    {NO_WIDTH_SPACE}
  </Text>
));

export default function Dashboard(props) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} vertical={true}>
          <Text style={styles.center}>August 29, 2021</Text>
          <Text style={styles.human}>I'm super stressed out. What can I do to relief stress?</Text>
          <Text style={styles.robot}>I recommend sleeping for longer hours and reducing your caffeine intake.</Text>
          <Text style={styles.human}>How many hours of sleep do I need?</Text>
          <Text style={styles.robot}>For most adults, 7 - 9 hours per night is the ideal amount.</Text>
          <Text style={styles.human}>Thank you so much!</Text>
          <Text style={styles.robot}>That's what I'm here for :)</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    //paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    height: 290,
    borderColor: '#B8EBD0',
    borderWidth: 1
    //borderRadius: 10,
    //flexDirection: 'column-reverse'
  },
  /*
  container: {
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    height: '50%',
    borderRadius: 10,
    flexDirection: 'column-reverse'
  },
  */
  robot: {
    textAlign: 'left',
    maxWidth: '40%',
    backgroundColor: '#B8EBD0',
    borderRadius: 10
  },
  human: {
    textAlign: 'left',
    marginLeft: '60%',
    backgroundColor: '#B8EBD0',
    borderRadius: 10
  },
  highlighted: {
    backgroundColor: '#B8EBD0',
  },
  center: {
    textAlign: 'center',
    marginBottom: 20
  }
});
