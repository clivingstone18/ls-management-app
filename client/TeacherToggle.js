import React, { useState, Button, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Switch } from "react-native";

export const TeacherToggle = ({
  onDuty,
  handleRemove,
  staff,
  handleSelection,
  index,
}) => {
  const [isEnabled, setIsEnabled] = useState(onDuty);

  const toggleSwitch = () => {
    if (isEnabled) {
      let res = handleRemove(index);
      if (res) {
        setIsEnabled(false);
      } else {
        return;
      }
    } else {
      handleSelection(staff, index);
      setIsEnabled(true);
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {`${staff.firstname} ${staff.lastname[0]}`}{" "}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },

  text: {
    fontFamily: "mainFont",
    fontSize: 20,
    textAlign: "center",
    marginBottom: "0.9%",
  },
});
