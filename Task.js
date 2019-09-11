import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Vibration,
  TouchableOpacity,
  Image
} from "react-native";
import { SafeAreaView } from "react-navigation";

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      minCounter: "25",
      secCounter: "00",
      startDisable: false
    };
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  onButtonStart = () => {
    this.setState({
      timer: null,
      minCounter: "25",
      secCounter: "00"
    });
    const PATTERN = [1000, 1000, 1000];
    let timer = setInterval(() => {
      var num = (Number(this.state.secCounter) - 1).toString();
      var count = this.state.minCounter;
      if (Number(this.state.secCounter) == 0) {
        count = (Number(this.state.minCounter) - 1).toString();
        num = "59";
      }
      this.setState({
        minCounter: count.length == 1 ? "0" + count : count,
        secCounter: num.length == 1 ? "0" + num : num
      });
      if (
        Number(this.state.minCounter) == 0 &&
        Number(this.state.secCounter) == 0
      ) {
        clearInterval(this.state.timer);
        this.setState({ startDisable: false });
        Vibration.vibrate(PATTERN);
      }
    }, 1000);
    this.setState({ timer });
    this.setState({ startDisable: true });
  };

  onButtonStop = () => {
    clearInterval(this.state.timer);
    this.setState({ startDisable: false });
  };

  // onButtonReset = () => {
  //   this.setState({
  //     timer: null,
  //     minCounter: "00",
  //     secCounter: "10"
  //   });
  // };

  render() {
    return (
      <SafeAreaView style={styles.MainContainer}>
        <Image style={styles.image} source={require("./assets/tomato.jpg")} />
        <Text style={styles.counterText}>
          {this.state.minCounter}:{this.state.secCounter}
        </Text>
        <TouchableOpacity
          onPress={this.onButtonStart}
          activeOpacity={0.6}
          style={[
            styles.button,
            {
              backgroundColor: this.state.startDisable ? "#B0BEC5" : "indianred"
            }
          ]}
          disabled={this.state.startDisable}
        >
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onButtonStop}
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: "indianred" }]}
        >
          <Text style={styles.buttonText}>STOP</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={this.onButtonReset}
          activeOpacity={0.6}
          style={[
            styles.button,
            {
              backgroundColor: this.state.startDisable ? "#B0BEC5" : "indianred"
            }
          ]}
          disabled={this.state.startDisable}
        >
          <Text style={styles.buttonText}>RESET</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  button: {
    width: "60%",
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 100,
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  },
  counterText: {
    fontSize: 50,
    color: "#000"
  },
  image: {
    height: 200,
    width: 200
  }
});
