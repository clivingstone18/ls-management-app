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
import { ButtonAll } from "../ButtonAll";
import UserService from "../services/UserService"
import AnimatedLoader from "react-native-animated-loader";

export const NewStaffForm = (props) => {
    const [inputFirstName, setInputFirstName] = useState("")
    const [inputLastName, setInputLastName] = useState("")
    const [inputDiploma, setInputDiploma] = useState("")
    const [loading, setLoading] = useState(false)

const resetInput = () => {
    setInputFirstName("");
    setInputLastName("");
    setInputDiploma(null);
  };


const handleAdd = () => {
    setLoading(true);
    if (!inputFirstName || !inputLastName || inputDiploma === null) {
      alert("Invalid: Information needed (Full name and Diploma status)");
      return;
    }
    const newStaffInfo = {
      firstName: inputFirstName,
      lastName: inputLastName,
      hasDiploma: inputDiploma,
    };
    UserService.addNewStaff(newStaffInfo).then(res=>{
        setLoading(false)
        resetInput();
        props.navigation.goBack();
    }).catch(err=>{console.log(err);setLoading(false)})
  };

  return(
    <View style={styles.container}>
        {loading && <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("./loader.json")}
        animationStyle={styles.lottie}
        speed={1} />} 
    <View style={styles.inputContainer}>
          <Text style={styles.text}>First Name</Text>
          <View style={styles.form}>
          <TextInput
            style={{
              height: 40,
              width: "90%",
              backgroundColor: "white",
            }}
            onChangeText={(text) => setInputFirstName(text)}
          />
          </View>
          <Text style={styles.text}>Last Name</Text>
          <View style={styles.form}>


          <TextInput
            style={{
              height: 40,
              width: "90%",
              backgroundColor: "white",
            }}
            onChangeText={(text) => setInputLastName(text)}
          />
          </View>
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
              props.navigation.navigate("StaffDirectory", {
                cancelled: true
              })
            }}
            title="Cancel"
          />
        </View>

        </View>
  )


}


const styles = StyleSheet.create({
    container: {
        padding: "5%",
        flex: 1,
        backgroundColor: "#FAFAFA",
      },
    infoContainer: {
      flex: 1,
    },
    form: {
        backgroundColor: "white",
        borderRadius: 5,
        paddingLeft: "0.5%",
        marginBottom: "3%",
        flexDirection: "row",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5.0,
      },
    staffInfoContainer: {
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "white",
      alignItems: "center",
      width: "100%",
      marginBottom: "2%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      marginBottom: "5%",
      shadowOpacity: 0.2,
      shadowRadius: 10.0,
      paddingLeft: "2%",
      elevation: 5,
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
    lottie: {
        width: 100,
        height: 100
      },
    label: {
      margin: 8,
    },
    emojiContainer: {
      flexDirection: "row",
    },
  });
  