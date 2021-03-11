import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretLeft , faCaretRight} from "@fortawesome/free-solid-svg-icons";
import * as ScreenOrientation from 'expo-screen-orientation';
import AnimatedLoader from "react-native-animated-loader";
import {DataViewDate} from "./DataViewDate";

const { height } = Dimensions.get("window");

export const DataView = (props) => {
    const [date, setDate] = useState(new Date());
    const scrollEnabled = screenHeight > height;
    const [screenHeight, setScreenHeight] = useState(0);

    const onContentSizeChange = (contentWidth, contentHeight) => {
    setScreenHeight(contentHeight);
    };

    return(


        <ScrollView
        style={{ flex: 1 }}
        onContentSizeChange={onContentSizeChange}
        scrollEnabled={scrollEnabled}
        contentContainerStyle={styles.scrollview}
      >
          <View style={styles.container}>
              <View style={styles.buttons}>
                  <TouchableOpacity onPress={()=>setDate(new Date(date) - 864e5)}>
          <FontAwesomeIcon
                  icon={faCaretLeft}
                  size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{
                      let today = new Date()
                      let nextDay = new Date()
                      nextDay.setDate(new Date(date).getDate()+1)
                      if ((today-nextDay) < 0) {
                      }
                      else {
                          setDate(nextDay)
                      }
                  }}>
                        <FontAwesomeIcon
                  icon={faCaretRight}
                  size={20}
                />
                </TouchableOpacity>
  
  </View>
  <DataViewDate date={date}/>
  </View>


      </ScrollView>







    )
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff"},
    head: { height: 40, backgroundColor: "#f1f8ff" },
    titleText: {
      fontFamily: "mainFont",
      fontSize: 25,
      marginBottom: "2%",
      alignSelf: "center",
    },
    lottie: {
      width: 100,
      height: 100
    },
    buttons: {
        display: "flex", 
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center" 
    },
    text: { 
      margin: 6 },
    scrollview: {
      flexGrow: 1,
    },
  });
  

