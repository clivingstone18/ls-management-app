import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

export const StaffPanel = (props) => {
  let color;

  props.staff.length < props.staffNeeded ? (color = "red") : (color = "green");
  props.staffNeeded === 0 ? (color = "black") : null;

  return (
    <View style={styles.container}>
      <View style={styles.staffIcon}>
        <FontAwesomeIcon icon={faUserAlt} size={60}></FontAwesomeIcon>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "mainFont",
            marginRight: "3%",
          }}
        >
          On duty
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "mainFont",
            marginRight: "3%",
          }}
        >
          {props.staff.length}
        </Text>
      </View>
      <View style={styles.staffIcon}>
        <FontAwesomeIcon
          icon={faUserAlt}
          size={60}
          color={color}
        ></FontAwesomeIcon>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "mainFont",
            marginRight: "3%",
            color: color,
          }}
        >
          Required
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "mainFont",
            marginRight: "3%",
            color,
          }}
        >
          {props.staffNeeded}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    shadowColor: "#000",
    borderRadius: 5,
    width: "95%",
    paddingLeft: "2%",
    marginLeft: "2%",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  text: {
    fontSize: 25,
    fontFamily: "mainFont",
    marginRight: "3%",
  },
  staffIcon: {
    alignItems: "center",
    justifyContent: "space-evenly",
    marginRight: "30%",
    width: "90%",
    height: "100%",
  },
});
