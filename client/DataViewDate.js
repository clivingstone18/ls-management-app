import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Button,
  View,
  Text,
} from "react-native";
import UserService from "./services/UserService"
import moment from "moment"
export const DataViewDate = (props) => { 
    const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    // api call to get most recent 
    let date = moment(props.date).format("YYYY-MM-DD")
    UserService.getClassDataOnDate(date).then(res=>{
        let info = res.data[0].rows
        let processedInfo = info.map(i => [moment(i.timeof, "HH:mm:ss").format("hh:mm A"), i.numemu+i.numkang+i.numkoala+i.numkook])
        console.log(processedInfo)




    }).catch(err=>console.log(err))
}, [props])

return(<View>
    
    <Text style={styles.titleText}>Data for {moment(props.date).format(
    "dddd, MMMM Do YYYY"

)}</Text></View>)
    }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f3f3f3",
      justifyContent: "space-around",
      paddingLeft: "2%",
      paddingRight: "2%",
      paddingTop: "3%",
  
    },titleText: {
      fontFamily: "mainFont",
      fontSize: 25,
      marginBottom: "2%",
      alignSelf: "center",
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
  