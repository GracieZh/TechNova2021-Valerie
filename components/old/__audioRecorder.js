import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import * as Clipboard from 'expo-clipboard';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';


export default function App(props) {
  const [recording, setRecording] = React.useState();
  const recordingOptions = {
    // android not currently in use, but parameters are required
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

  async function startRecording() {
    /*
    Audio.setIsEnabledAsync(true)
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
    */
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') return;
    
    // some of these are not applicable, but are required
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
  
    });
    const recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
    } catch (error) {
      console.log(error);
      stopRecording();
    }
    setRecording(recording);
  }
  

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    let uri = recording.getURI(); 

    /*
    if (uri.includes('%40')){
      uri = uri.replace('%40', '%2540');
    }
    if (uri.includes('%2F')){
      uri = uri.replace('%2F', '%252F');
    }
    */

    Clipboard.setString(uri);
    //playRecording(uri);
    downloadAndPlay(uri);

    alert('Recording stopped and stored at ' + uri);
    console.log('Recording stopped and stored at', uri);

  }
  
  async function downloadAndPlay(soundUri) {
    //URI: file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540gracieexpo%252FValerie/Audio/recording-81894a19-fbba-446b-bea7-e34f851e1baa.m4a
    
    //var arr = soundUri.toString().split("/");        
    //var filename= arr[arr.length-1];
    //const Dir = FileSystem.cacheDirectory;
    //console.log("FILENAME: " + filename);
    //console.log("DIR: " + Dir);
    /*
    FileSystem.downloadAsync(soundUri, Dir + filename)
    .then(({uri})=>{
      console.log("finished downloading to", uri)
    })
    .catch(error=>{
      console.error(error);
    });
    */
    //const sound = new Audio.Sound();
    try {
      //await sound.loadAsync(require(Dir + filename));
      
      const sound = Audio.Sound.createAsync({uri: soundUri});
      console.log("Sound", sound);
      await sound.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
     
   }

   
  async function playRecording(file) {
    
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(file);
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }
  


  return (
    <TouchableOpacity style={styles.circle} onPress={recording ? stopRecording : startRecording}>
      {/*
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      */}
      <FontAwesome 
        name= { recording ? 'stop' : 'microphone' } 
        size={35} color="white" 
        onPress={recording ? stopRecording : startRecording}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //backgroundColor: '#ecf0f1',
    padding: 10,
  },
  circle: {
    borderRadius: 50,
    backgroundColor: '#42B2DF',
    height: 70,
    width: 70,
    //position: 'absolute',
    //top: -35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
