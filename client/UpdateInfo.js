import React, { useState, useEffect } from "react";
import moment from 'moment'; 

import {
  View,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { timeToStr } from "./TimeKeeper.js";
import { ButtonAll } from "./ButtonAll";
import Emoji from "react-native-emoji";
import {GroupCounter} from "./GroupCounter"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UpdateInfo = (props) => {
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(moment().format("hh:mm A"));
  const [numActive, setNumActive] = useState(0);

  let info = props.route.params.prevInfo;
  info = info[info.length - 1];
  const [numNursery, setNumNursery] = useState(info.numNursery);
  const [numKangaroos, setNumKangaroos] = useState(info.numKangaroos);
  const [numEmus, setNumEmus] = useState(info.numEmus);
  const [numKook, setNumKook] = useState(info.numKook);
  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);
  const [showPicker4, setShowPicker4] = useState(false);
  const [showTime, setShowTime] = useState(false);

  // add to local storage 

  async function storeData(newInfo) {
    try {
      const jsonValue = JSON.stringify(newInfo);
      let item = await AsyncStorage.setItem("childrenCount", jsonValue);
      return item;
    } catch (e) {
      alert("Error saving, try again");
      return e;
    }
  }

  useEffect(() => {
    var now = moment().format("hh:mm A");
    setDate(now)
  }, [])

  const onSubmit = async () => {
    var now = moment().format("hh:mm A");
    let newInfo = {
      date: now,
      numNursery: numNursery,
      numKangaroos: numKangaroos,
      numEmus: numEmus,
      numKook: numKook,
      staffOnDuty: props.route.params.staffOnDuty,
    };
    let allInfo = [...props.route.params.prevInfo, newInfo]
   // props.route.params.updateInfo(allInfo);

    let result = storeData(allInfo)
    props.navigation.goBack();


    // time to save to local storage 
  };

  const handleShow = (currPicker) => {
    let vars = [showPicker1, showPicker2, showPicker3, showPicker4, showTime];
    let methods = [
      setShowPicker1,
      setShowPicker2,
      setShowPicker3,
      setShowPicker4,
      setShowTime,
    ];

    if (!vars[currPicker] && numActive === 1) {
      return;
    } else if (!vars[currPicker] && numActive === 0) {
      methods[currPicker](true);
      setNumActive(1);
    } else if (vars[currPicker] && numActive === 1) {
      methods[currPicker](false);
      setNumActive(0);
    }
  };

  const onChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(currentDate);
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Time</Text>
        <View style={styles.form}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>{date}</Text>
            <TouchableOpacity onPress={() => handleShow(4, !showTime)}>
              {!showTime ? (
                <Emoji name="arrow_down_small" style={{ fontSize: 30 }} />
              ) : (
                <Emoji name="arrow_up_small" style={{ fontSize: 30 }} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {showTime ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            iRNNumberPickers24Hour={false}
            display="default"
            onChange={onChange}
          />
        ) : null}

        <Text style={styles.text}>Number in nursery</Text>
        <View style={styles.form}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>{numNursery}</Text>
            <TouchableOpacity onPress={() => handleShow(0, setShowPicker1)}>
              {!showPicker1 ? (
                <Emoji name="arrow_down_small" style={{ fontSize: 30 }} />
              ) : (
                <Emoji name="arrow_up_small" style={{ fontSize: 30 }} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {showPicker1 ? <GroupCounter count={numNursery} setCount={setNumNursery} /> : null}


        <Text style={styles.text}>Number in kookaburra</Text>
        <View style={styles.form}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>{numKook}</Text>
            <TouchableOpacity onPress={() => handleShow(1, setShowPicker2)}>
              {!showPicker2 ? (
                <Emoji name="arrow_down_small" style={{ fontSize: 30 }} />
              ) : (
                <Emoji name="arrow_up_small" style={{ fontSize: 30 }} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {showPicker2 ? <GroupCounter count={numKook} setCount={setNumKook} /> : null}

        <Text style={styles.text}>Number in emus</Text>
        <View style={styles.form}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>{numEmus}</Text>
            <TouchableOpacity onPress={() => handleShow(2, setShowPicker3)}>
              {!showPicker3 ? (
                <Emoji name="arrow_down_small" style={{ fontSize: 30 }} />
              ) : (
                <Emoji name="arrow_up_small" style={{ fontSize: 30 }} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {showPicker3 ? <GroupCounter count={numEmus} setCount={setNumEmus} /> : null}

        <Text style={styles.text}>Number in kangaroos</Text>
        <View style={styles.form}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>{numKangaroos}</Text>
            <TouchableOpacity onPress={() => handleShow(3, setShowPicker4)}>
              {!showPicker3 ? (
                <Emoji name="arrow_down_small" style={{ fontSize: 30 }} />
              ) : (
                <Emoji name="arrow_up_small" style={{ fontSize: 30 }} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {showPicker4 ? <GroupCounter count={numKangaroos} setCount={setNumKangaroos} /> : null}
      </View>
      <View>
        <ButtonAll handlePress={onSubmit} title={"Save changes"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "3.5%",
    flex: 1,
    backgroundColor: "#FAFAFA",
    flexDirection: "column",
    justifyContent: "space-between",
    
  },
  form: {
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
  },

  text: {
    fontFamily: "mainFont",
    fontSize: 20,
    marginBottom: "1%",
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
