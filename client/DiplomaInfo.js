import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Emoji from "react-native-emoji";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { ButtonAll } from "./ButtonAll";
export const DiplomaInfo = (props) => {
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputDiploma, setInputDiploma] = useState(null);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [staffList, setStaffList] = useState();

  const sorted = (staffObjectList) => {
    staffObjectList.sort((a, b) => {
      let x = a.firstName[0].toLowerCase();
      let y = b.firstName[0].toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    return staffObjectList;
  };

  const storeData = async (value) => {
    try {
      setStaffList(sorted(value));
      const jsonValue = JSON.stringify(value);
      AsyncStorage.setItem("staffInfo", jsonValue).then(setStaffList(value));
    } catch (e) {
      alert("Error saving, try again");
    }
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
        setStaffList(sorted(val));
      })
      .catch((e) => console.log("failed"));
  }, []);

  const resetInput = () => {
    setInputFirstName("");
    setInputLastName("");
    setInputDiploma(null);
  };

  const handleRemove = async (index) => {
    const newStaffList = staffList.filter((staff) => staff != staffList[index]);
    setStaffList(newStaffList);
  };

  const handleAdd = async () => {
    if (!inputFirstName || !inputLastName || inputDiploma === null) {
      alert("Invalid: Information needed (Full name and Diploma status)");
      return;
    }

    const newStaffInfo = {
      firstName: inputFirstName,
      lastName: inputLastName,
      hasDiploma: inputDiploma,
    };

    let newStaffList;
    if (Array.isArray(staffList) && staffList.length) {
      newStaffList = [...staffList, newStaffInfo];
    } else {
      newStaffList = [newStaffInfo];
    }
    setStaffList(newStaffList);
    resetInput();
    setAdding(false);
  };

  const handleSubmit = () => {
    storeData(sorted(staffList));
    setStaffList([]);
    props.navigation.goBack();
  };

  const staffToText = () => {
    return staffList.map((staff, index) => (
      <View style={styles.staffInfoContainer} key={index}>
        <Text style={styles.text}>
          {" "}
          {staff.firstName} {staff.lastName} {" - "}
          {staff.hasDiploma ? "Diploma/Working Towards" : "No diploma"}
        </Text>
        {removing ? (
          <TouchableOpacity onPress={() => handleRemove(index)}>
            <FontAwesomeIcon
              icon={faMinusCircle}
              size={0}
              color={"red"}
            ></FontAwesomeIcon>
          </TouchableOpacity>
        ) : null}
      </View>
    ));
  };

  useEffect(() => {
    if (!Array.isArray(staffList) || staffList.length === 0) {
      setRemoving(false);
    }
  }, [staffList]);

  return (
    <View style={styles.container}>
      {!Array.isArray(staffList) ||
        (staffList.length === 0 && (
          <Text style={styles.text}>There are no staff in the directory.</Text>
        ))}

      {Array.isArray(staffList) && staffList.length !== 0
        ? staffToText()
        : null}

      {adding && (
        <View style={styles.inputContainer}>
          <Text style={styles.text}>First Name</Text>
          <TextInput
            style={{
              height: 40,
              width: "90%",
              backgroundColor: "white",
            }}
            onChangeText={(text) => setInputFirstName(text)}
          />
          <Text style={styles.text}>Last Name</Text>

          <TextInput
            style={{
              height: 40,
              width: "90%",
              backgroundColor: "white",
            }}
            onChangeText={(text) => setInputLastName(text)}
          />
          <Text style={styles.text}>
            Has or is working towards diploma?{" "}
            {inputDiploma ? <Emoji name="+1" style={{ fontSize: 30 }} /> : null}
            {inputDiploma != null && inputDiploma === false ? (
              <Emoji name="-1" style={{ fontSize: 30 }} />
            ) : null}
          </Text>

          <View style={styles.emojiContainer}>
            <TouchableOpacity onPress={() => setInputDiploma(true)}>
              <Emoji name="+1" style={{ fontSize: 50 }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setInputDiploma(false)}>
              <Emoji name="-1" style={{ fontSize: 50 }} />
            </TouchableOpacity>
          </View>

          <ButtonAll handlePress={handleAdd} title="Confirm" />
          <ButtonAll
            handlePress={() => {
              resetInput();
              setAdding(false);
            }}
            title="Cancel"
          />
        </View>
      )}

      {!adding && !removing && (
        <ButtonAll handlePress={() => setAdding(true)} title="Add Staff" />
      )}

      {Array.isArray(staffList) &&
        staffList.length !== 0 &&
        !removing &&
        !adding && (
          <ButtonAll
            handlePress={() => setRemoving(true)}
            title="Remove Staff"
          />
        )}
      {Array.isArray(staffList) &&
        staffList.length !== 0 &&
        !adding &&
        removing && (
          <ButtonAll
            handlePress={() => {
              setRemoving(false);
              resetInput();
            }}
            title="Cancel"
          />
        )}
      {!adding && (
        <ButtonAll handlePress={handleSubmit} title="Save all changes" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "3.5%",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  staffInfoContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  form: {
    backgroundColor: "white",
    borderRadius: 5,
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
  inputContainer: {
    flex: 2,
    width: "100%",
    marginTop: "5%",
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
  label: {
    margin: 8,
  },
  emojiContainer: {
    flexDirection: "row",
  },
});
