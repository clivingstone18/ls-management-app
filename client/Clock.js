import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { timeToStr, minsToNextUpdate, dateToStr } from "./TimeKeeper.js";
import { useFonts } from "expo-font";

function Clock() {
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [timeToNextUpdate, setTimeToNextUpdate] = useState(0);

  const [loaded] = useFonts({
    mainFont: require("./assets/fonts/Roboto-Thin.ttf"),
  });

  const tick = () => {
    let currDate = new Date();
    setTime(timeToStr(currDate));
    setTimeToNextUpdate(minsToNextUpdate(currDate.getMinutes()));
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
    flex: 0.2,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "center",
    shadowColor: "#000",
    borderRadius: 5,
    width: "94%",
    paddingLeft: "2%",
    marginLeft: "3.2%",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  text: {
    fontSize: 40,
    fontFamily: "mainFont",
  },
});

export default Clock;
