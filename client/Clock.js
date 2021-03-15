import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { timeToStr, dateToStr } from "./TimeKeeper.js";
import { useFonts } from "expo-font";

function Clock() {
  const [time, setTime] = useState(timeToStr(new Date()));
  const [day, setDay] = useState(dateToStr(new Date()));
  const [loaded] = useFonts({
    mainFont: require("./assets/fonts/Roboto-Thin.ttf"),
  });

  const tick = () => {
    let currDate = new Date();
    setTime(timeToStr(currDate));
    setDay(dateToStr(currDate));
  };

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  if (loaded) {
    return (
      <View style={clockStyles.container}>
        <Text style={clockStyles.text}>{day}</Text>
        <Text style={clockStyles.text}>{time}</Text>
      </View>
    );
  } else {
    return <Text>font not loaded</Text>;
  }
}

const clockStyles = StyleSheet.create({
  container: {
    flex: 0.15,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    borderRadius: 15,
    width: "88%",
    paddingLeft: "4%",
  },
  text: {
    fontSize: 40,
    fontFamily: "mainFont",
  },
});

export default Clock;
