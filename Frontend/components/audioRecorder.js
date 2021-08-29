import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function App() {
  const [recording, setRecording] = React.useState();
  const [uri, setUri] = React.useState('');

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function uploadAudioAsync(uri) {
    console.log("Uploading " + uri);
    //let apiUrl = 'http://192.168.1.216:8888/upload.php';
    let apiUrl = 'https://trypython2.nn.r.appspot.com/upload';
    
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
  
    let formData = new FormData();
    formData.append('file', {
      uri,
      name: `recording.${fileType}`,
      type: `audio/x-${fileType}`,
    });
  
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    
    let res = null;
    console.log("POSTing " + uri + " to " + apiUrl);
    await fetch(apiUrl, options) 
    .then ( response => {
      console.log("RESPONSE: ", JSON.stringify(response));
      res = response;
    })
    .catch (err => {
      console.log("Err: ", err);
    })
    
    //const data = await response.json();
    //console.log("data: ", data);



    return res;
  }
  

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    setUri(uri);


    console.log('Recording stopped and stored at', uri);

    uploadAudioAsync(uri);
  }

  async function playRecording() {
    console.log('Playing recording..');
    const { sound } = await Audio.Sound.createAsync(
       {uri}
    );
    console.log('Playing Sound');
    await sound.playAsync();
    console.log('Recording stopped and stored at', uri);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.circle} onPress={recording ? stopRecording : startRecording}>
        <FontAwesome 
          name= { recording ? 'stop' : 'microphone' } 
          size={35} color="white" 
          onPress={recording ? stopRecording : startRecording}
        />
      </TouchableOpacity>
      {/*!recording && <Button
        title={'Play Recording'}
        onPress={playRecording}
      />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#ecf0f1',
    padding: 10,
  },
  circle: {
    borderRadius: 50,
    backgroundColor: '#0093E9',
    height: 70,
    width: 70,
    position: 'absolute',
    top: -35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
