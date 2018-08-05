import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Button,
  BackHandler,
  StatusBar
} from "react-native";
import Speach from './Speach';

export default class App extends Component {
  constructor(props){
    super(props);
    this.__nextPage = this.__nextPage.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state ={
      touched: false
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    if(this.state.touched){//open speach
      console.log("back! when speach open");
      this.setState({
        touched: false
      });
      return true;
    }else {
      console.log("back! when speach close");
      return false;
    }
  }
  /**server part**/
  __onPressButton() {
    console.log("press button");
    /*
    fetch('http://10.27.12.30:3000/text', {
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
    */
  }
  /** server part **/
  __nextPage() {
      console.log("touch cute peach");
      this.setState({
        touched: true
      });
  }

  render() {
    const { isLoaded } = this.state;
    return (

      <ImageBackground
        source={require("./image/background.jpg")}
        style={styles.loading}>
        <StatusBar  barStyle="light-content" translucent={true} backgroundColor={'transparent'} />
        <View style={styles.container}>
          <TouchableOpacity onPress={this.__nextPage}>
            <ImageBackground source={require("./image/킹숭아.png")} style={styles.peach}/>
          </TouchableOpacity>
          <Text style={styles.loadingText}>복숭아를 눌러봐!</Text>
        </View>
        {this.state.touched ? (
          <Speach />
        ) : (
          null
        )}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "flex-end"
  },
  loading: {
    flex: 1,
    width: null,
    height: null,
    paddingBottom: 100
  },
  peach: {
    width: 250,
    height: 250,
    marginBottom: 20
  },
  loadingText: {
    fontSize: 40,
    fontWeight: "200",
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center"
  }
});
