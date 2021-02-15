import React, { useState, useEffect } from "react";
import Clock from "./Clock";
import { View, StyleSheet, Text, Image } from "react-native";
import { useFonts } from "expo-font";
import { calcRatio } from "./calcRatio";
import { Stats } from "./Stats";
import { Widgets } from "./Widgets";
import { StaffPanel } from "./StaffPanel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";


export const Home = (props) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState([
    {
      date: "none",
      numKook: 0,
      numKangaroos: 0,
      numEmus: 0,
      numNursery: 0,
      staffOnDuty: [],
    },
  ]);
  const [staffOnDuty, setStaffOnDuty] = useState([]);
  const [fontLoaded] = useFonts({
    mainFont: require("./assets/fonts/Roboto-Thin.ttf"),
  });

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        let jsonValue = await AsyncStorage.getItem("childrenCount");
        if (jsonValue !== null) {
          return JSON.parse(jsonValue);
        } else {
          return ([
            {
              date: "none",
              numKook: 0,
              numKangaroos: 0,
              numEmus: 0,
              numNursery: 0,
              staffOnDuty: [],
            },
          ]);
        }
      } catch (e) {
        console.log(e);
        return e;
      }
    };
    getData()
      .then((val) => {
        setLoading(false);
        setInfo(val)
      })
      .catch((e) => console.log("failed"));
  }, [props, isFocused]);



  const reset = async () => {
    setInfo([
      {
        date: "none",
        numNursery: 0,
        numKook: 0,
        numKangaroos: 0,
        numEmus: 0,
        staffOnDuty: [],
      },
    ]);
    setStaffOnDuty([]);
    try {
      let item = await AsyncStorage.setItem("childrenCount", "");
      return item;
    }
    catch (err) {
      return err
    }

  };

  const staffNeeded = calcRatio(
    info[info.length - 1].numNursery,
    info[info.length - 1].numKook,
    info[info.length - 1].numEmus + info[info.length - 1].numKangaroos
  );

  if (fontLoaded && !loading) {
    return (
      <View style={styles.container}>
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
          info={info}
          staffOnDuty={staffOnDuty}
          setStaffOnDuty={setStaffOnDuty}
          reset={reset}
        />
      </View>
    );
  } else {
    return <Text>Font not loaded</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "space-around",
    paddingTop: "0%",
  },
  widgetContainer: {
    flex: 0.4,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  topPanel: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "2%",
    paddingTop: "2%",
  },
  statsContainer: {
    backgroundColor: "green",
    flex: 0.2,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5%",
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
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 20,
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
