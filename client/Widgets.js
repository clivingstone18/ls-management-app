import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Widget } from "./Widget";
import {
  faEdit,
  faCopy,
  faUserAlt,
  faInfo,
  faUserAltSlash,
  faCaretRight,
  faCaretLeft,
  faBookOpen,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeHol = async (value) => {
  try {
    let item;
    if (value) item = "true"
    else item = "false";
    let result = await AsyncStorage.setItem("holMode", item)
    return result;
  } catch (e) {
    console.log(e)
    return e;
  }
};

export const Widgets = (props) => {
  const [page, setPage] = useState(1);
  return (
    <View style={styles.container}>
      <View style={styles.caratContainer}>
        {page === 2 && (
          <TouchableOpacity onPress={() => setPage(1)}>
            <FontAwesomeIcon
              style={{ alignSelf: "center" }}
              icon={faCaretLeft}
              color="#69a3ff"
              size={32}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.widgetContainer}>
        {page === 1 ? (
          <>
            <Widget
              title="Update children count"
              icon={faEdit}
              handleOnPress={() =>
                props.staffOnDuty.length
                  ? props.navigate("UpdateInfo", {
                      setRefresh: props.setRefresh,
                      updateInfo: props.setInfo,
                      prevInfo: props.info,
                      staffOnDuty: props.staffOnDuty,
                      holidayMode: props.holidayMode
                    })
                  : alert("Someone must be on duty")
              }
            />
            <Widget
              title="Update staff on duty"
              icon={faUserAlt}
              handleOnPress={() =>
                props.navigate("ChangeTeacher", {
                  setRefresh: props.setRefresh,
                  staffOnDuty: props.staffOnDuty,
                  setStaffOnDuty: props.setStaffOnDuty,
                  staff: props.staff,
                })
              }
            />
            <Widget
              title="View ratio sheet"
              icon={faCopy}
              handleOnPress={() => props.navigate("PrintSheet")}
            />
            <Widget
              title="Reset staff on duty"
              icon={faUserAltSlash}
              disabled={props.info.length === 1}
              handleOnPress={props.resetData}
            />
          </>
        ) : (
          <>
            <Widget
              title="Update staff directory"
              icon={faInfo}
              handleOnPress={() =>
                props.navigate("StaffDirectory", {
                  staffOnDuty: props.staffOnDuty,
                  setStaffOnDuty: props.setStaffOnDuty,
                  setResetting: props.setResetting,
                  staff: props.staff,
                  setStaff: props.setStaff
                })
              }
            />
            <Widget
              title="View daily data"
              icon={faBookOpen}
              handleOnPress={() => props.navigate("DataView", {})}
            />
            <Widget
              title="Set school holiday mode"
              icon={faSun}
              handleOnPress={() => {
                let mode = !props.holidayMode
                props.setHolidayMode(mode);
                storeHol(mode)
                .then(res => {
                  console.log(res)
                })
                .catch(err=>console.log(err))
              }
            }
            />
          </>
        )}
      </View>
      <View style={styles.caratContainer}>
        {page === 1 && (
          <TouchableOpacity onPress={() => setPage(2)}>
            <FontAwesomeIcon
              style={{ alignSelf: "center" }}
              icon={faCaretRight}
              color="#69a3ff"
              size={32}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  caratContainer: {
    flex: 0.05,
    alignItems: "center",
    justifyContent: "space-around",
  },
  widgetContainer: {
    flex: 0.95,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    alignItems: "center",
    paddingLeft: "0%",
  },
});
