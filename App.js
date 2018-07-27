import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar
} from "react-native";

export default class App extends Component {
  state = {
    isLoaded: false
  };
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
