import React, { Component } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import { RootStackParamList } from "../common";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type State = {
  recognized: string;
  pitch: string;
  error: string;
  end: string;
  started: string;
  results: string[];
  partialResults: string[];
};

export interface ExploreProps
  extends NativeStackScreenProps<RootStackParamList, "Explore"> {}

class Explore extends Component<ExploreProps, State> {
  state = {
    recognized: "",
    pitch: "",
    error: "",
    end: "",
    started: "",
    results: [],
    partialResults: [],
  };

  constructor(props: ExploreProps) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e: any) => {
    console.log("onSpeechStart: ", e);
    this.setState({
      started: "√",
    });
  };

  onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log("onSpeechRecognized: ", e);
    this.setState({
      recognized: "√",
    });
  };

  onSpeechEnd = (e: any) => {
    console.log("onSpeechEnd: ", e);
    this.setState({
      end: "√",
    });
  };

  onSpeechError = (e: SpeechErrorEvent) => {
    console.log("onSpeechError: ", e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e: SpeechResultsEvent) => {
    console.log("onSpeechResults: ", e);
    this.setState({
      results: e.value === undefined ? [] : e.value,
    });

    setTimeout(
      () =>
        this.props.navigation.navigate("Home", {
          sorted: e.value?.some((w) => w.includes("math")) ?? false,
        }),
      500
    );
  };

  onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log("onSpeechPartialResults: ", e);
    this.setState({
      partialResults: e.value === undefined ? [] : e.value,
    });
  };

  onSpeechVolumeChanged = (e: any) => {
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
    });

    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
    });
  };

  _updateInput = (r: string) => {
    this.setState({ results: [r] });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("./icon.png")} />
        <Text style={styles.welcome}>How would you like to volunteer?</Text>
        <IconButton
          onPress={this._startRecognizing}
          style={styles.button}
          icon={() => <Icon name="microphone" color="red" size={50} />}
        />
        <Text style={styles.said}>
          {(this.state.end
            ? this.state.results
            : this.state.partialResults)[0] || ""}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    marginBottom: 50,
  },
  button: {
    width: 75,
    height: 75,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    color: "#8A81F5",
    textAlign: "center",
    margin: 10,
  },
  said: {
    color: "#8A81F5",
    textAlign: "center",
    margin: 10,
  },
  text: {
    fontSize: 20,
    padding: 10,
    margin: 10,
    maxHeight: "50%",
    height: "50%",
    width: "100%",
    borderWidth: 1,
  },
  action: {
    textAlign: "center",
    color: "#0000FF",
    marginVertical: 5,
    fontWeight: "bold",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  stat: {
    textAlign: "center",
    color: "#B0171F",
    marginBottom: 1,
  },
});

export default Explore;
