import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
} from "react-native";
import UserService from "./services/UserService"
import moment from "moment"
import {DataChart} from "./DataChart"
import AnimatedLoader from "react-native-animated-loader";

export const DataViewDate = (props) => { 
    const [loading, setLoading] = useState(false);
    const [mornTimes, setMornTimes] = useState([]);
    const [mornCounts, setMornCounts] = useState([]);
    const [afternoonTimes, setAfternoonTimes] = useState([]);
    const [afternoonCounts, setAfternoonCounts] = useState([]);
    const [morn, setMorn] = useState(true);

    const toggleSwitch = () => {
      setMorn(!morn);
    };

    let date = props.date;
  
  useEffect(() => {
    setLoading(true)
    // api call to get most recent
    let date = moment(props.date).format("YYYY-MM-DD")
    UserService.getClassDataOnDate(date).then(res=>{
        let info = res.data;
        // process info 
        let processedInfoMorning = [];
        let processedInfoAfternoon = [];
        console.log(info);
        setMornTimes(processedInfoMorning.map(i=>i.time));
        setMornCounts(processedInfoMorning.map(i=>i.numChildren));
        setAfternoonTimes(processedInfoAfternoon.map(i=>i.time));
        setAfternoonCounts(processedInfoAfternoon.map(i=>i.numChildren));
        setLoading(false);
    }).catch(err=>console.log(err))
}, [date])

return(
      loading ? <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("./StaffDirectory/loader.json")}
        animationStyle={styles.lottie}
        speed={1} />
         : 
         <View>
    
    <Text style={styles.titleText}>Data for {moment(props.date).format(
    "dddd, MMMM Do YYYY"

)}</Text>
{morn ? 
    <View style={{alignItems: "center"}}>
    <Text style={{
    fontFamily: "mainFont",
    fontSize: 25,
    marginBottom: "5%",
  }}>{"Morning "} <Switch
  trackColor={{ false: "#767577", true: "#81b0ff" }}
  thumbColor={"#f5dd4b"}
  ios_backgroundColor="#3e3e3e"
  onValueChange={toggleSwitch}
  value={morn}
  style={{paddingBottom: 0, paddingTop: 0, alignSelf: "center"}}
  
  /></Text>

  <DataChart x={mornTimes} y={mornCounts} title={"Morning"}/>
  </View>
:

<View style={{alignItems: "center"}}>
<Text style={{
    fontFamily: "mainFont",
    fontSize: 25,
    marginBottom: "5%",
  }}>{"Afternoon "}
  
  <Switch
trackColor={{ false: "#767577", true: "#81b0ff" }}
thumbColor={"#f5dd4b"}
ios_backgroundColor="#3e3e3e"
onValueChange={toggleSwitch}
value={morn}
style={{paddingBottom: 0, paddingTop: 0, alignSelf: "center"}}

/></Text>


<DataChart x={afternoonTimes} y={afternoonCounts} title={"Afternoon"}/>
</View>


}


</View>)
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
  