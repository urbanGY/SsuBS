import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar } from 'react-native';

export default class App extends Component {
  state = {
    isLoaded: false
  };
  render() {
    const { isLoaded } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden = { true } />
          { isLoaded ? (
            <View>
              <Text>loading complete</Text>
            </View>
          ) : (
            <View style = {styles.loading}>
              <ImageBackground
                source = {require('./background.jpg')}
                style = {{
                  flex: 1,
                  width: null,
                  height: null
                }}
              />
              <Text style = {styles.loadingText}>loading fail</Text>
            </View>
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
    justifyContent: "flex-end"
  },
  loadingText: {
    fontSize: 40,
    color: "white",
    backgroundColor: "transparent",
    alignItems: 'center',
    paddingBottom: 40
  }
});
