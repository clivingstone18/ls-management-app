import React, { useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView, Text } from "react-native";
import {PrintSheet} from "./PrintSheet"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretLeft , faCaretRight} from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment"
const { height } = Dimensions.get("window");

export const DateSheetTimeChanger = () => {
  const [date, setDate] = useState(new Date());
  const [screenHeight, setScreenHeight] = useState(0);
  const scrollEnabled = screenHeight > height;


const onContentSizeChange = (contentWidth, contentHeight) => {
    setScreenHeight(contentHeight);
  };

  return (
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
        <PrintSheet currDate={date} />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
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
      flexDirection: "row"
  },
  text: { margin: 6 },
  scrollview: {
    flexGrow: 1,
  },
});
