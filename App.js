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
import SpeechAndroid from 'react-native-android-voice';

export default class App extends Component {
  constructor(props){
    super(props);
    this.__peachClick = this.__peachClick.bind(this);
    //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state ={
      text: "default"
      //touched: false
    }
  }
  /*
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
  */

  /**server part
  fetch('http://192.168.0.5/text', {
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
  server part **/

  async __peachClick(){
    try{
        //More Locales will be available upon release.
        console.log("touch cute peach");
        var spokenText = await SpeechAndroid.startSpeech("말해봐", SpeechAndroid.KOREA);
        this.setState({
          text: spokenText
        });
        fetch('http://192.168.0.5:8081/text', {
          method:'POST',
          headers: {
            Accept:'application/json',
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            text:spokenText,
          }),
        });
    }catch(error){
        switch(error){
            case SpeechAndroid.E_VOICE_CANCELLED:
                ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
                break;
            case SpeechAndroid.E_NO_MATCH:
                ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
                break;
            case SpeechAndroid.E_SERVER_ERROR:
                ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
                break;
        }
    }
  }

  render() {
    return (
      <ImageBackground
        source={require("./image/background.jpg")}
        style={styles.loading}>
        <StatusBar  barStyle="light-content" translucent={true} backgroundColor={'transparent'} />
        <View style={styles.container}>
          <Text style={styles.speak}>{this.state.text}</Text>
          <TouchableOpacity onPress={this.__peachClick}>
            <ImageBackground source={require("./image/킹숭아.png")} style={styles.peach}/>
          </TouchableOpacity>
          <Text style={styles.loadingText}>복숭아를 눌러봐!</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'flex-start'
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
    marginBottom: 30
  },
  loadingText: {
    fontSize: 40,
    fontWeight: "200",
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center"
  },
  speak: {
    fontSize: 20,
    fontWeight: "200",
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 110,
    marginTop: 130
  }
});
