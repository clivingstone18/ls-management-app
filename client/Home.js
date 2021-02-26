import React, { useState, useEffect } from "react";
import Clock from "./Clock";
import { View, StyleSheet, Text, Image, ScrollView} from "react-native";
import { useFonts } from "expo-font";
import { calcRatio } from "./calcRatio";
import { Stats } from "./Stats";
import { Widgets } from "./Widgets";
import { StaffPanel } from "./StaffPanel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import UserService from "./services/UserService"
import AnimatedLoader from "react-native-animated-loader";

export const Home = (props) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [refresh, setRefresh] = useState(true)
  const [info, setInfo] = useState(
    {
      dateof: "none",
      timeof: "",
      numkook: 0,
      numkang: 0,
      numemu: 0,
      numkoala: 0,
    },
  );
  const [staffOnDuty, setStaffOnDuty] = useState([]);
  const [fontLoaded] = useFonts({
    mainFont: require("./assets/fonts/Roboto-Thin.ttf"),
  });

  const getData = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem("staffPicked");
      if (jsonValue !== null) {
        return JSON.parse(jsonValue);
      } else {
        return ([]);
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  useEffect(() => {
    if (resetting) {
      setResetting(false)
      getData().then(res=>{return}).catch(err=>{console.log(err); return})
    }
    if (isFocused && refresh) {
      setLoading(true)
      setRefresh(false)
    getData()
      .then((val) => {
        setStaffOnDuty(val)
    UserService.getClassData().then(res=>{
      setLoading(false)
      if (!res.data[0]) {
        return;
      }
      setInfo(res.data[0])
    }).catch(err=>setLoading(false))

      })
      .catch((e) => setLoading(false) );
    }
  }, [props, isFocused]);




  const reset = async () => {
    setInfo(
      {
        dateof: "none",
        timeof: "",
        numkook: 0,
        numkang: 0,
        numemu: 0,
        numkoala: 0,
      },
    );
    setStaffOnDuty([]);
    try {
      let item = await AsyncStorage.setItem("childrenCount", "");
      let otherItem = await AsyncStorage.setItem("staffPicked", "");

      return item;
    }
    catch (err) {
      return err
    }

  };

  const staffNeeded = calcRatio(
    info.numkoala,
    info.numkook,
    info.numemu + info.numkang
  );


return (


      <View style={styles.container}>
          {loading && <AnimatedLoader
    visible={true}
    overlayColor="rgba(255,255,255,0.75)"
    source={require("./StaffDirectory/loader.json")}
    animationStyle={styles.lottie}
    speed={1} /> }
        <View style={styles.topPanel}>
          <Image source={require("./assets/kindyLogo.png")} />
          <StaffPanel
            staff={staffOnDuty}
            navigate={props.navigation.navigate}
            setStaffOnDuty={setStaffOnDuty}
            staffNeeded={staffNeeded}
          />
        </View>
        <Clock />
        <Stats info={info} />
        <Widgets
          navigate={props.navigation.navigate}
          setInfo={setInfo}
          setRefresh={setRefresh}
          info={info}
          setResetting={setResetting}
          staffOnDuty={staffOnDuty}
          setStaffOnDuty={setStaffOnDuty}
          reset={reset}
        />
      </View>
    );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    justifyContent: "space-around",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: "3%",

  },
  lottie: {
    width: 100,
    height: 100
  },
  topPanel: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "2%",
  },
  text: {
    fontFamily: "mainFont",
    fontSize: 30,
    marginBottom: "5%",
  },
  stat: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "mainFont",
  },
  widget: {
    backgroundColor: "#f8f8f8",
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 40,
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
