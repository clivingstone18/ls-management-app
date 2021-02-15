import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEdit,
  faCopy,
  faSignOutAlt,
  faUserAlt,
  faInfo,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { print } from "./print";

export const Widgets = (props) => {

  const handlePrint = () => {
    if (props.info[props.info.length - 1].date !== "none") {
      print(props.info).then(res=>console.log(res)).catch(err=>console.log(err))
    } else {
      alert("Nothing to print yet");
    }
  };



  return (
    <View style={styles.widgetContainer}>
      <View style={styles.widget}>
        <TouchableOpacity
          onPress={() =>
            props.staffOnDuty.length
              ? props.navigate("UpdateInfo", {
                  updateInfo: props.setInfo,
                  prevInfo: props.info,
                  staffOnDuty: props.staffOnDuty,
                })
              : alert("Someone must be on duty")
          }
        >
          <Text style={styles.text}>Update children count</Text>
          <FontAwesomeIcon
            style={{ alignSelf: "center" }}
            icon={faEdit}
            size={32}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.widget}>
        <TouchableOpacity
          onPress={() =>
            props.info.date !== "none"
              ? props.navigate("ChangeTeacher", {
                  staffOnDuty: props.staffOnDuty,
                  setStaffOnDuty: props.setStaffOnDuty,
                })
              : alert(props.info.date)
          }
        >
          <Text style={styles.text}>Update staff on duty</Text>
          <FontAwesomeIcon
            style={{ alignSelf: "center" }}
            icon={faUserAlt}
            size={32}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.widget}>
        <TouchableOpacity
          onPress={() =>
            props.info[props.info.length - 1].date !== "none"
              ? props.navigate("PrintSheet", {
                  info: props.info,
                  staffOnDuty: props.staffOnDuty,
                })
              : alert("Log some information first")
          }
        >
          <Text style={styles.text}>Open ratio checker sheet</Text>
          <FontAwesomeIcon
            style={{ alignSelf: "center" }}
            icon={faCopy}
            size={32}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.widget}>
        <TouchableOpacity onPress={handlePrint}>
          <Text style={styles.text}>Print ratio checker sheet</Text>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            style={{ alignSelf: "center" }}
            size={32}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.widget}>
        <TouchableOpacity
          onPress={() =>
            props.info.date !== "none"
              ? props.navigate("DiplomaInfo", {
                  staffOnDuty: props.staffOnDuty,
                })
              : alert(props.info.date)
          }
        >
          <Text style={styles.text}>Update staff directory</Text>
          <FontAwesomeIcon
            style={{ alignSelf: "center" }}
            icon={faInfo}
            size={32}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.widget}>
        <TouchableOpacity
          disabled={props.info.length === 1}
          onPress={() =>
            Alert.alert(
              "Before clearing all...",
              "Would you like to print the ratio sheet?",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    handlePrint();
                    props.reset();
                  },
                },
                {
                  text: "No",
                  onPress: () => props.reset(),
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ]
            )
          }
        >
          <Text style={styles.text}>Clear data</Text>
          <FontAwesomeIcon
            style={{ alignSelf: "center" }}
            icon={faHome}
            size={32}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    justifyContent: "space-evenly",
  },

  widgetContainer: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },

  text: {
    fontFamily: "mainFont",
    fontSize: 25,
    marginBottom: "5%",
  },
  stat: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "mainFont",
  },
  widget: {
    height: "35%",
    width: "30%",
    padding: "2.5%",
    alignItems: "center",
    justifyContent: "space-evenly",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 5,
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
