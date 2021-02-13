import React, { Button } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

function ToggleNums(props) {
  const [loaded] = useFonts({
    mainFont: require("./assets/fonts/Roboto-Thin.ttf"),
  });
  return (
    <View>
      <Text style={styles.text}>{props.title}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={props.numOf === 0}
          onPress={() => props.updateNumOf((prev) => prev - 1)}
        >
          <Text style={(styles.text, { color: "#427bf5" })}>-</Text>
        </TouchableOpacity>

        <Text style={styles.text}>{props.numOf}</Text>

        <TouchableOpacity onPress={() => props.updateNumOf((prev) => prev + 1)}>
          <Text style={(styles.text, { color: "#427bf5" })}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ToggleNums;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    justifyContent: "space-evenly",
  },

  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  text: {
    fontFamily: "mainFont",
    fontSize: 20,
    textAlign: "center",
    marginBottom: "0.9%",
  },
  stat: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "mainFont",
  },
  widget: {
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    marginBottom: "5%",
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    paddingLeft: "2%",
    elevation: 24,
  },
});
