import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground
} from "react-native";
import SpeechAndroid from 'react-native-android-voice';

export default class Speach extends Component {
  constructor(props){
    super(props);
    this._buttonClick = this._buttonClick.bind(this);
    this.state ={
      text: "default"
    }
  }

  async _buttonClick(){
    try{
        //More Locales will be available upon release.
        var spokenText = await SpeechAndroid.startSpeech("말해봐", SpeechAndroid.KOREA);
        
        this.setState({
          text: spokenText
        });
        //ToastAndroid.show(spokenText , ToastAndroid.LONG);
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
            /*And more errors that will be documented on Docs upon release*/
        }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>google speach!</Text>
        <Text style={styles.speechText}>{this.state.text}</Text>
        <Button
          onPress = {this._buttonClick()}
          title = "send post"
          color = "#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  text: {
    fontSize: 40,
    fontWeight: "200",
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center"
  },
  speechText: {
    fontSize: 10,
    fontWeight: "200",
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center"
  }
});
