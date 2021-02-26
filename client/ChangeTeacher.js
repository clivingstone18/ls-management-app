import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Button,
  View,
  Text,
} from "react-native";
import { TeacherToggle } from "./TeacherToggle.js";
import UserService from "./services/UserService"
import AnimatedLoader from "react-native-animated-loader";

export const ChangeTeacher = (props) => {
  const [staffPicked, setStaffPicked] = useState(
    props.route.params.staffOnDuty
  );
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [staffList, setStaffList] = useState([]);

  const info = props.route.params.info;

  const handleSubmit = () => {
    setSubmit(true);
    props.route.params.setRefresh(true)
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("staffPicked", jsonValue)
      return value;
    } catch (e) {
      alert("Error saving, try again");
    }
  };



  useEffect(() => {
    setLoading(true)
    UserService.getAllStaff()
      .then((res) => {
        setLoading(false)
        setStaffList(res.data);
      })
      .catch((e) => setLoading(false));
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        let jsonValue = await AsyncStorage.getItem("staffPicked");
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
        setStaffPicked(val);
      })
      .catch((e) => console.log("failed"));
  }, []);












  useEffect(() => {
    if (submit === true) {
      storeData(staffPicked).then(
        res=>{
          props.route.params.setStaffOnDuty(res)
          props.navigation.goBack()
        })
        .catch(err=>console.log(err))


    }
  }, [submit]);


  const handleRemove = (index) => {
    if (staffPicked.length < 2) {
      alert("Must have at least one teacher");
      return 0;
    }

    const newList = staffPicked.filter(
      (staff) =>
        staff.firstname !== staffList[index].firstname &&
        staff.lastname !== staffList[index].lastname
    );
    setStaffPicked(newList);
    return 1;
  };

  const handleSelection = (value, i) => {
    for (let j = 0; j < staffPicked.length; j++) {
      if (
        i != j &&
        value.firstname === staffPicked[j].firstname &&
        value.lastname === staffPicked[j].lastname
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
    <View style={styles.container}>
    {loading ? <AnimatedLoader
    visible={true}
    overlayColor="rgba(255,255,255,0.75)"
    source={require("./StaffDirectory/loader.json")}
    animationStyle={styles.lottie}
    speed={1} />  :
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
                  mem.firstname === staff.firstname &&
                  mem.lastname === staff.lastname
              ).length > 0
            }
            handleRemove={handleRemove}
          />
        );
      })}
      {staffList.length ? <Button title="Save changes" onPress={handleSubmit} /> : <Text style={styles.text}>
        
        No staff have been added to the staff directory.
        
        </Text>}
      </>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "3.5%",
    padding: "10%",
    flex: 1,
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
  lottie: {
    width: 100,
    height: 100
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
