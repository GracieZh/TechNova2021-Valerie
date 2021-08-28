
import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render } from 'react-dom';

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
        <Text style={styles.human}>{highlight("I'm super stressed out. What can I do to relief stress?")}</Text>
        <Text style={styles.robot}>{highlight("I recommend more sleep and reducing your caffeine intake.")}</Text>
        <Text style={styles.human}>{highlight("Message 4")}</Text>
        <Text style={styles.robot}>{highlight("Message 5")}</Text>
        <Text style={styles.human}>{highlight("Message 6")}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    height: '50%',
    borderRadius: 10,
    flexDirection: 'column-reverse'
  },
  robot: {
    textAlign: 'left',
    maxWidth: '40%',
  },
  human: {
    textAlign: 'left',
    paddingLeft: '60%'
  },
  highlighted: {
    backgroundColor: '#B8EBD0',
  },
});
