import React, { useState } from "react";
import {
  View,
  Button,
  Platform,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFonts } from "expo-font";
import { timeToStr, minsToNextUpdate, dateToStr } from "./TimeKeeper.js";
import { Picker } from "@react-native-picker/picker";
import { ButtonAll } from "./ButtonAll";
import Emoji from "react-native-emoji";

export const UpdateInfo = (props) => {
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
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

  const onSubmit = () => {
    let newInfo = {
      date: date,
      numNursery: numNursery,
      numKangaroos: numKangaroos,
      numEmus: numEmus,
      numKook: numKook,
      staffOnDuty: props.route.params.staffOnDuty,
    };
    props.route.params.updateInfo([...props.route.params.prevInfo, newInfo]);
    props.navigation.goBack();
  };

  const handleShow = (currPicker, currPickerMethod) => {
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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode("time");
  };

  let pickers = [];
  let pickeritems = [];
  let groups = [
    { val: numNursery, setter: setNumNursery, key: 0 },
    { val: numKook, setter: setNumKook, key: 1 },
    { val: numEmus, setter: setNumEmus, key: 2 },
    { val: numKangaroos, setter: setNumKangaroos, key: 3 },
  ];

  for (let j = 0; j < 21; j++) {
    pickeritems[j] = <Picker.Item label={j.toString()} value={j} key={j} />;
  }

  for (let i = 0; i < groups.length; i++) {
    pickers[i] = (
      <Picker
        style={{ height: 200, width: 100, alignSelf: "center" }}
        key={i}
        onValueChange={(value) => groups[i].setter(value)}
        selectedValue={groups[i].val}
      >
        {pickeritems}
      </Picker>
    );
  }

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
            <Text style={styles.text}>{timeToStr(date)}</Text>
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
        {showPicker1 ? pickers[0] : null}

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
        {showPicker2 ? pickers[1] : null}

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
        {showPicker3 ? pickers[2] : null}

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
        {showPicker4 ? pickers[3] : null}
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
