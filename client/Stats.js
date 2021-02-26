import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { calcRatio } from "./calcRatio";

export const Stats = ({ info, insufficientStaff }) => {
  console.log(info)
  return (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Text style={{ fontSize: 30 }}>{info.numkoala}</Text>
        <Text style={{ fontFamily: "mainFont", fontSize: 25 }}>Nursery</Text>
      </View>
      <View style={styles.stat}>
        <Text style={{ fontSize: 30 }}>{info.numkook}</Text>
        <Text style={{ fontFamily: "mainFont", fontSize: 25 }}>
          Kookaburras
        </Text>
      </View>
      <View style={styles.stat}>
        <Text style={{ fontSize: 30 }}>{info.numemu}</Text>
        <Text style={{ fontFamily: "mainFont", fontSize: 25 }}>Emus</Text>
      </View>
      <View style={styles.stat}>
        <Text style={{ fontSize: 30 }}>{info.numkang}</Text>
        <Text style={{ fontFamily: "mainFont", fontSize: 25 }}>Kangaroos</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flex: 0.1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingLeft: "5%",
  },
  stat: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "mainFont",
  },
});
