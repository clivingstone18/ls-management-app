import React, { useState, useEffect } from "react";
import UserService from "../services/UserService"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { ButtonAll } from "../ButtonAll";
import AnimatedLoader from "react-native-animated-loader";
import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';

export const DiplomaInfo = (props) => {
  const [removing, setRemoving] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused();

  const sorted = (staffObjectList) => {
    staffObjectList.sort((a, b) => {
      let x = a.firstname[0].toLowerCase();
      let y = b.lastname[0].toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    return staffObjectList;
  };
                                                                                                                                                                                                                                                                                                                                                                                                     
  useEffect(() => {
    if (props.route && props.route.params && props.route.params.cancelled) {
      return;
    }

    if (isFocused) { 
      setLoading(true);
      UserService.getAllStaff().then(res=>{
        setStaffList(res.data)
        setLoading(false)
      }).catch(err=>{setLoading(false); console.log(err)})
    }

  }, [isFocused]);

  const handleRemove = async (staffId) => {
    setLoading(true);
    UserService.deleteStaff(staffId).then(res => {
      UserService.getAllStaff().then(res=>{
        setStaffList(res.data)
        setLoading(false)
      }).catch(err=>{setLoading(false); console.log(err)})
    }).catch(err=>{setLoading(false); console.log(err)})
  }

  useEffect(() => {
    if (!Array.isArray(staffList) || staffList.length === 0) {
      setRemoving(false);
    }
  }, [staffList]);


  const staffToText = () => {
    return (
    <View style={styles.container}>        

    {sorted(staffList).map((staff, index) => (
      <View key={index} style={{display:"flex", flexDirection: "row", justifyContent: "space-around"}}>
      <View style={styles.staffInfoContainer} key={index}>
        <Text style={styles.boldText}>
          {" "}
          {staff.firstname} {staff.lastname} 
        </Text>
        <Text style={styles.text}>
        {staff.hasdiploma ? "Diploma/Working Towards" : "No diploma"}

        </Text>
        
      </View>
      {removing ? (
        <View style={{alignItems: "center", paddingLeft: "5%", display: "flex", justifyContent: "space-around"}}>
          
        <TouchableOpacity onPress={() => handleRemove(staff.staffid)}>
          <FontAwesomeIcon
            icon={faMinusCircle}
            size={20}
            color={"red"}
          ></FontAwesomeIcon>
        </TouchableOpacity>
        </View>
      ) : null}
                </View>

      
    ))}

    </View> )
  };

  return (
    <View style={styles.container}>

      {loading && <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("./loader.json")}
        animationStyle={styles.lottie}
        speed={1} /> }
        

{Array.isArray(staffList) &&
  staffList.length !== 0 && <Text style={styles.header}>Little Scribblers Staff Directory</Text> }

        
{!Array.isArray(staffList) ||
        (staffList.length === 0 && (
          <Text style={{alignSelf:"center", 
          fontFamily: "mainFont",
          fontSize: 20,
          marginBottom: "1%"}}>There are no staff in the directory.</Text>
        ))}


  <View style={{display:"flex", flexDirection: "row", alignSelf: "center", justifyContent: "space-between"}}>

<ButtonAll handlePress={() => props.navigation.navigate("NewStaffForm")} title="Add Staff" />
{Array.isArray(staffList) && staffList.length !== 0 && !removing &&
 <ButtonAll color="red" handlePress={() => setRemoving(true)} title="Remove Staff" />}

{Array.isArray(staffList) &&
        staffList.length !== 0 &&
        removing && (
          <ButtonAll
            color="red" 
            handlePress={() => {
              setRemoving(false);
            }}
            title="Stop Removing"
          />
        )}

</View>







      {Array.isArray(staffList) && staffList.length !== 0
        ? 
        <View style={styles.infoContainer}>{staffToText()}</View>
      : null}
    
      
     </View>
  )
    };

const styles = StyleSheet.create({
  container: {
    padding: "5%",
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "#FAFAFA",
  },
  infoContainer: {
    flex: 1,
  },
  staffInfoContainer: {
    borderRadius: 5,
    backgroundColor: "white",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: "2%",
    elevation: 5,
  },
  text: {
    fontFamily: "mainFont",
    fontSize: 20,
    marginBottom: "1%",
  },
  header: {
    alignSelf: "center",
    fontFamily: "mainFont",
    fontSize: 24,
    marginBottom: "3%",
  },
  lottie: {
    width: 100,
    height: 100
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
  label: {
    margin: 8,
  },
  boldText: {
    fontWeight: "bold",
    fontFamily: "mainFont",
    fontSize: 22,
    marginBottom: "1%",
  },
  emojiContainer: {
    flexDirection: "row",
  },
});
