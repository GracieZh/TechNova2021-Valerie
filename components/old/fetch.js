
import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';

export default function testFetch() {
    const [res, setRes] = React.useState();

    async function fetchInfo() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "id": "9" })
        };
        // const response = await fetch('https://reqres.in/api/posts', requestOptions);
        console.log("post data");
        const response = await fetch('https://8080-0960aa54-5a4c-4960-849a-4d2d900d0f43.cs-us-east1-pkhd.cloudshell.dev/text', requestOptions);
        console.log("response =", response);
        const data = await response.text();
        //const data = await response.json();
        console.log("post done", data);
    }

  return (
    <View style={styles.container}>
        <Button title='Test Fetch' onPress={fetchInfo} />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: 10
    }
});
