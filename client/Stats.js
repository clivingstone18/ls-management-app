import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { calcRatio } from "./calcRatio";

export const Stats = ({ info, holidayMode }) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Text style={{ fontSize: 30 }}>{info.numkoala}</Text>
        <Text style={{ fontFamily: "mainFont", fontSize: 22 }}>Nursery</Text>
      </View>
      <View style={styles.stat}>
        <Text style={{ fontSize: 30 }}>{info.numkook}</Text>
        <Text style={{ fontFamily: "mainFont", fontSize: 22 }}>Kookaburras</Text>
      </View>
      <View style={styles.stat}>
        <Text style={{ fontSize: 30 }}>{info.numemu}</Text>
        <Text style={{ fontFamily: "mainFont", fontSize: 22 }}>Emus</Text>
      </View>
      <View style={styles.stat}>
        <Text style={{ fontSize: 30 }}>{info.numkang}</Text>
        <Text style={{ fontFamily: "mainFont", fontSize: 22 }}>Kangaroos</Text>
      </View>
      {holidayMode && 
      <View style={styles.stat}>
        <Text style={{ fontSize: 30 }}>{info.numcroc}</Text>
        <Text style={{ fontFamily: "mainFont", fontSize: 22 }}>Crocodiles</Text>
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flex: 0.1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingLeft: "10%"
  },
  stat: {
    flex: 0.7,
    flexDirection: "column",
    fontFamily: "mainFont",
  },
});
