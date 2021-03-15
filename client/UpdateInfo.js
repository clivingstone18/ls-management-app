import React, { useState } from "react";
import moment from 'moment'; 
import UserService from "./services/UserService"
import {
  View,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ButtonAll } from "./ButtonAll";
import Emoji from "react-native-emoji";
import {GroupCounter} from "./GroupCounter"
import AnimatedLoader from "react-native-animated-loader";

export const UpdateInfo = (props) => {
  const [date, setDate] = useState(new Date());
  const [numActive, setNumActive] = useState(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const staffOnDuty = props.route.params.staffOnDuty;

  let info = props.route.params.prevInfo;
  let showCroc = props.route.params.holidayMode;

  const [numNursery, setNumNursery] = useState(info.numkoala);
  const [numKangaroos, setNumKangaroos] = useState(info.numkang);
  const [numEmus, setNumEmus] = useState(info.numemu);
  const [numKook, setNumKook] = useState(info.numkook);
  const [numCroc, setNumCroc] = useState(info.numcroc);
  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);
  const [showPicker4, setShowPicker4] = useState(false);
  const [showPicker5, setShowPicker5] = useState(false);
  const [showTime, setShowTime] = useState(false);

  // add to local storage 

  const onSubmit = async () => {
    setLoading(true);
    props.route.params.setRefresh(true);
    var now = moment(date).format("HH:mm");
    let newInfo = {
      date: moment(date).format("YYYY-MM-D"),
      time: now,
      numNursery: numNursery,
      numKangaroos: numKangaroos,
      numEmus: numEmus,
      numKook: numKook,
      numCroc: numCroc,
      staffOnDuty: staffOnDuty,
    };
    UserService.addNewClassData(newInfo).then(res=>{
      setLoading(false)
      props.navigation.navigate("Home");
    }).then(err=>setLoading(false))
  };

  const handleShow = (currPicker) => {
    let vars = [showPicker1, showPicker2, showPicker3, showPicker4, showPicker5, showTime];
    let methods = [
      setShowPicker1,
      setShowPicker2,
      setShowPicker3,
      setShowPicker4,
      setShowPicker5,
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
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      {loading && <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("./StaffDirectory/loader.json")}
        animationStyle={styles.lottie}
        speed={0.1} />}
      <View>
        <Text style={styles.text}>Time</Text>
        <View style={styles.form}>
          <View
            style={{
              flex: 1,
              backgroundColor: showTime ? "#f3f3f3" : "white",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>{moment(date).format("hh:mm A")}</Text>
            <TouchableOpacity onPress={() => handleShow(5)}>
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
            mode="time"
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
              backgroundColor: showPicker1 ? "#f3f3f3" : "white",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>{numNursery}</Text>
            <TouchableOpacity onPress={() => handleShow(0)}>
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
              backgroundColor: showPicker2 ? "#f3f3f3" : "white",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>{numKook}</Text>
            <TouchableOpacity onPress={() => handleShow(1)}>
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
              backgroundColor: showPicker3 ? "#f3f3f3" : "white",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>{numEmus}</Text>
            <TouchableOpacity onPress={() => handleShow(2)}>
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
              backgroundColor: showPicker4 ? "#f3f3f3" : "white",
            }}
          >
            <Text style={styles.text}>{numKangaroos}</Text>
            <TouchableOpacity onPress={() => handleShow(3)}>
              {!showPicker4 ? (
                <Emoji name="arrow_down_small" style={{ fontSize: 30 }} />
              ) : (
                <Emoji name="arrow_up_small" style={{ fontSize: 30 }} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {showPicker4 ? <GroupCounter count={numKangaroos} setCount={setNumKangaroos} /> : null}

        {showCroc &&
        <>

        <Text style={styles.text}>Number in crocodiles</Text>
        <View style={styles.form}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: showPicker5 ? "#f3f3f3" : "white",
            }}
          >
            <Text style={styles.text}>{numCroc}</Text>
            <TouchableOpacity onPress={() => handleShow(4)}>
              {!showPicker4 ? (
                <Emoji name="arrow_down_small" style={{ fontSize: 30 }} />
              ) : (
                <Emoji name="arrow_up_small" style={{ fontSize: 30 }} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {showPicker5 ? <GroupCounter count={numCroc} setCount={setNumCroc} />
 : null}
         </> }


      </View>
      <View>
        <ButtonAll handlePress={onSubmit} title={"Save changes"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "5%",
    flex: 1,
    backgroundColor: "#f3f3f3",
    flexDirection: "column",
    justifyContent: "space-between",
    
  },
  form: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: "0.5%",
    marginBottom: "2%",
    flexDirection: "row",
  },
  text: {
    fontFamily: "mainFont",
    fontSize: 20,
    marginBottom: "2%",
    fontWeight: "bold",
  },  lottie: {
    width: 100,
    height: 100
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
