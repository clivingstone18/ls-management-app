import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Button,
} from "react-native";
import { TeacherToggle } from "./TeacherToggle.js";

export const ChangeTeacher = (props) => {
  const [staffPicked, setStaffPicked] = useState(
    props.route.params.staffOnDuty
  );
  const [submit, setSubmit] = useState(false);
  const [staffList, setStaffList] = useState([]);

  const info = props.route.params.info;

  const handleSubmit = () => {
    setSubmit(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let jsonValue = await AsyncStorage.getItem("staffInfo");
        if (jsonValue !== null) {
          return JSON.parse(jsonValue);
        } else {
          return [];
        }
      } catch (e) {
        console.log("ERROR");
      }
    };
    getData()
      .then((val) => {
        setStaffList(val);
      })
      .catch((e) => console.log("failed"));
  }, []);

  useEffect(() => {
    if (submit === true) {
      props.route.params.setStaffOnDuty(staffPicked);
      props.navigation.goBack();
    }
  }, [submit]);

  const handleRemove = (index) => {
    if (staffPicked.length < 2) {
      alert("Must have at least one teacher");
      return 0;
    }

    console.log("STAFF TO DELETE");
    console.log(staffList[index]);
    console.log("ALL STAFF PRESENT");
    console.log(staffPicked);

    const newList = staffPicked.filter(
      (staff) =>
        staff.firstName !== staffList[index].firstName &&
        staff.firstName !== staffList[index].firstName
    );
    console.log("NEW LIST");
    console.log(newList);

    setStaffPicked(newList);
    return 1;
  };

  const handleSelection = (value, i) => {
    for (let j = 0; j < staffPicked.length; j++) {
      if (
        i != j &&
        value.firstName === staffPicked[j].firstName &&
        value.lastName === staffPicked[j].lastName
      ) {
        return;
      }
    }
    const newStaffList = [
      ...staffPicked.slice(0, i),
      value,
      ...staffPicked.slice(i + 1),
    ];
    setStaffPicked(newStaffList);
    return;
  };

  return (
    <>
      {staffList.map((staff, index) => {
        return (
          <TeacherToggle
            key={index}
            staff={staff}
            handleSelection={handleSelection}
            index={index}
            onDuty={
              staffPicked.filter(
                (mem) =>
                  mem.firstName === staff.firstName &&
                  mem.lastName === staff.lastName
              ).length > 0
            }
            handleRemove={handleRemove}
          />
        );
      })}
      <Button title="Submit changes" onPress={handleSubmit}></Button>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "3.5%",
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  form: {
    backgroundColor: "white",
    borderRadius: 5,
  },

  text: {
    fontFamily: "mainFont",
    fontSize: 20,
    marginBottom: "1%",
    alignSelf: "center",
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
    borderRadius: 10,
    marginTop: "2%",
    fontSize: 20,
    color: "black",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
});
