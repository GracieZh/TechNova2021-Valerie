import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [sound, setSound] = React.useState();
  const [playing, setIsPlaying] = React.useState();
  const [url, setUrl] = React.useState();


  async function getAudio() {
    fetch('http://192.168.1.216:8888/uploads/horse.mp3', {
        method: 'GET'
    })
    .then((response) => {
      console.log('Response: ', JSON.stringify(response));
      setUrl(JSON.parse(response).url);
      console.log("URL: ", url);
    })
    .catch((error) => {
        //Error 
        console.error(error);
    });
  }
  
  async function playSound() {
    Audio.setIsEnabledAsync(true)
    console.log('Loading Sound');

    getAudio();

    
    const { sound } = await Audio.Sound.createAsync(
       require('../../assets/music1.mp3')
    );
    setSound(sound);
    setIsPlaying("True");

    //console.log('Playing Sound');
    await sound.playAsync(); }

    async function stopSound() {
        setIsPlaying(undefined);
        Audio.setIsEnabledAsync(false)
    }

  React.useEffect(() => {
    return sound
      ? () => {
          //console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
        <Button
            title={playing ? 'Stop Sound' : 'Play Sound'}
            onPress={playing ? stopSound : playSound}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //backgroundColor: '#ecf0f1',
    //padding: 10,
  },
});
