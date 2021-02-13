import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { calcRatio } from "./calcRatio";

export const Stats = ({ info, insufficientStaff }) => {
  if (info.length > 1) {
    info = info.slice(-1)[0];
  } else {
    info = info[0];
  }
  return (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Text style={{ fontSize: 30 }}>{info.numNursery}</Text>
        <Text style={{ fontFamily: "mainFont", fontSize: 25 }}>Nursery</Text>
      </View>
      <View style={styles.stat}>
        <Text style={{ fontSize: 30 }}>{info.numKook}</Text>
        <Text style={{ fontFamily: "mainFont", fontSize: 25 }}>
          Kookaburras
        </Text>
      </View>
      <View style={styles.stat}>
        <Text style={{ fontSize: 30 }}>{info.numEmus}</Text>
        <Text style={{ fontFamily: "mainFont", fontSize: 25 }}>Emus</Text>
      </View>
      <View style={styles.stat}>
        <Text style={{ fontSize: 30 }}>{info.numKangaroos}</Text>
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
