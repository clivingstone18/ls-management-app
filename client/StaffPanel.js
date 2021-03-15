import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

export const StaffPanel = (props) => {
  let numDip = 0;
  props.staff.map(staff=>staff.hasdiploma ? numDip++ : null)

  let color;
  props.staff.length < props.staffNeeded || numDip/props.staff.length < 0.5 ? (color = "red") : (color = "green");
  props.staffNeeded === 0 ? (color = "black") : null;
  return (
    <View style={styles.container}>
      <View style={styles.staffIcon}>
      <Text
          style={{
            fontWeight: "700",
            fontSize: 25,
            fontFamily: "mainFont",
            marginRight: "3%",
          }}
        >
          ON DUTY
        </Text>
        <FontAwesomeIcon icon={faUserAlt} size={60}></FontAwesomeIcon>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "mainFont",
            marginRight: "3%",
          }}
        >
          Dip: {numDip}
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "mainFont",
            marginRight: "3%",
          }}
        >
          Non: {props.staff.length - numDip}
        </Text>
      </View>

      <View style={styles.staffIcon}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 25,
            fontFamily: "mainFont",
            marginRight: "3%",
            color: color,
          }}
        >
          REQUIRED
        </Text>
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
            color,
          }}
        >
          Total: {props.staffNeeded}
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "mainFont",
            marginRight: "3%",
            color,
          }}
        >
          Dip: {props.staffNeeded * 0.5}+
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
    width: "100%",
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
    width: "100%",
    height: "100%",
  },
});
