import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';

import AudPlayer2 from '../components/old/__audioPlayer';
import AudPlayer from '../components/audioPlayer';
import TestFetch from '../components/old/fetch';
import AudRecorder from '../components/audioRecorder';

export default function Dashboard() {
    return (
      <View style={styles.container}>
        {/*<AudPlayer/>
        <AudRecorder/>     */}
        <TestFetch />
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      paddingTop: 100,
    },
   
  });
  