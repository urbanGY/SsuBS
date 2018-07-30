import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  StatusBar
} from "react-native";

export default class App extends Component {
  state = {
    isLoaded: false
  };

  __onPressButton() {
    console.log("press button");
    fetch('http://192.168.208.24:8081/text', {
      method:'POST',
      headers: {
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        text:'simple test text!',
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      var re = responseJson.returnText;
      console.log("re : "+re);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    const { isLoaded } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        {isLoaded ? (
          <View>
            <Text>loading complete</Text>
          </View>
        ) : (
          <ImageBackground
            source={require("./background.jpg")}
            style={styles.loading}
          >
            <Text style={styles.loadingText}>Input your case</Text>
            <Button
              onPress = {this.__onPressButton}
              title = "send post"
              color = "#841584"
            />
          </ImageBackground>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loading: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "flex-end",
    paddingBottom: 60
  },
  loadingText: {
    fontSize: 40,
    fontWeight: "200",
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center"
  }
});
