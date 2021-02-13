import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import Emoji from "react-native-emoji";

export const ActivatedForm = (props) => {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    if (props.numPickers == 1) {
      if (!active && !props.pickerIsActive) {
        props.setPickerIsActive(true);
        setActive(true);
      } else {
        props.setPickerIsActive(false);
        setActive(false);
      }
      return;
    }
    if (!active && props.pickerIsActive) {
      return;
    } else if (!active && !props.pickerIsActive) {
      setActive(true);
      props.setPickerIsActive(true);
    } else if (active && props.pickerIsActive) {
      setActive(false);
      props.setPickerIsActive(false);
    }
  };

  return (
    <View key={props.rm}>
      <Text style={styles.text}>Staff #{props.index + 1}</Text>

      <TouchableOpacity onPress={handleActive}>
        <View style={styles.form}>
          <Text style={styles.text}>
            {props.staffPicked[props.index].firstName
              ? props.staffPicked[props.index].firstName
              : "Tap to select...."}
          </Text>
          {!props.pickerIsActive && props.removeMode ? (
            <TouchableOpacity
              key={props.key}
              onPress={(e) => props.handleRemove(props.rm)}
            >
              <FontAwesomeIcon
                icon={faMinusCircle}
                size={0}
                color={"red"}
              ></FontAwesomeIcon>
            </TouchableOpacity>
          ) : null}
          {!props.removeMode && props.pickerIsActive ? (
            <Emoji name="arrow_up_small" style={{ fontSize: 30 }} />
          ) : null}
          {!props.removeMode && !props.pickerIsActive ? (
            <Emoji name="arrow_down_small" style={{ fontSize: 30 }} />
          ) : null}
        </View>
      </TouchableOpacity>

      {active ? (
        <Picker
          style={{ height: 200, width: 100, alignSelf: "center" }}
          key={props.index}
          onValueChange={(value) => props.handleSelection(value, props.index)}
          selectedValue={props.staffPicked[props.index]}
        >
          {props.allStaff.map((member) => (
            <Picker.Item
              label={member.firstName}
              value={member}
              key={member.firstName}
            />
          ))}
        </Picker>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "3.5%",
    flex: 1,
    backgroundColor: "#FAFAFA",
    marginBottom: "2%",
  },
  form: {
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "mainFont",
    fontSize: 20,
    marginBottom: "1%",
  },
  stat: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "mainFont",
  },
  button: {
    width: "30%",
    backgroundColor: "white",
    fontFamily: "mainFont",
    borderRadius: 20,
    marginTop: "2%",
    fontSize: 20,
    color: "black",
    justifyContent: "center",
    textAlign: "center",
  },
});
