import React, {useState} from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import {
  faEdit,
  faCopy,
  faUserAlt,
  faInfo,
  faUserAltSlash,
  faCaretRight,
  faCaretLeft,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
 

export const Widgets = (props) => {
  const [page, setPage] = useState(1)

  return (
    <View style={styles.container}>
      <View style={styles.caratContainer}>      

      { page === 2 && 
<TouchableOpacity onPress={()=>setPage(1)}>
 <FontAwesomeIcon
 style={{ alignSelf: "center" }}
 icon={faCaretLeft}
 color="#69a3ff"
  size={32}
  />
  </TouchableOpacity>  
} 
</View>
    <View style={styles.widgetContainer}>
      
      { 
      (page === 1) ? 
      <>
      <View style={styles.widget}>
        <TouchableOpacity
          onPress={() =>
            props.staffOnDuty.length
              ? props.navigate("UpdateInfo", {
                  setRefresh: props.setRefresh,
                  updateInfo: props.setInfo,
                  prevInfo: props.info,
                  staffOnDuty: props.staffOnDuty,
                })
              : alert("Someone must be on duty")
          }
        >
          <Text style={styles.text}>Update children count</Text>
          <FontAwesomeIcon
            style={{ alignSelf: "center" }}
            icon={faEdit}
            size={32}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.widget}>
        <TouchableOpacity
          onPress={() => props.navigate("ChangeTeacher", {
            setRefresh: props.setRefresh,
                  staffOnDuty: props.staffOnDuty,
                  setStaffOnDuty: props.setStaffOnDuty,
                })
          }
        >
          <Text style={styles.text}>Update staff on duty</Text>
          <FontAwesomeIcon
            style={{ alignSelf: "center" }}
            icon={faUserAlt}
            size={32}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.widget}>
        <TouchableOpacity
          onPress={() =>
            props.info.dateof !== "none"
              ? props.navigate("PrintSheet")
              : alert("Log some information first")
          }
        >
          <Text style={styles.text}>View ratio sheet</Text>
          <FontAwesomeIcon
            style={{ alignSelf: "center" }}
            icon={faCopy}
            size={32}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.widget}>
        <TouchableOpacity
          disabled={props.info.length === 1}
          onPress={props.resetData}
        >
          <Text style={styles.text}>Reset staff on duty</Text>
          <FontAwesomeIcon
            style={{ alignSelf: "center" }}
            icon={faUserAltSlash}
            size={32}
          />
        </TouchableOpacity>
      </View>

     </> : 
      <>

<View style={styles.widget}>
        <TouchableOpacity
          onPress={() =>
 props.navigate("StaffDirectory", {
                  staffOnDuty: props.staffOnDuty,
                  setStaffOnDuty: props.setStaffOnDuty,
                  setResetting: props.setResetting,
                })
          }
        >
          <Text style={styles.text}>Update staff directory</Text>
          <FontAwesomeIcon
            style={{ alignSelf: "center" }}
            icon={faInfo}
            size={32}
          />
        </TouchableOpacity>
      </View>
     
      <View style={styles.widget}>
        <TouchableOpacity
          onPress={() => props.navigate("DataView", {})}>
          <Text style={styles.text}>View daily data</Text>
          <FontAwesomeIcon
            style={{ alignSelf: "center" }}
            icon={faBookOpen}
            size={32}
          />
        </TouchableOpacity>
      </View>


      </>
}

</View>
<View style={styles.caratContainer}>      
{ page === 1 && 
<TouchableOpacity onPress={()=>setPage(2)}>
 <FontAwesomeIcon
 style={{ alignSelf: "center" }}
 icon={faCaretRight}
 color="#69a3ff"
  size={32}
  />
  </TouchableOpacity>  
} 
</View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  caratContainer: {
    flex: 0.05,
    alignItems: "center",
    justifyContent: "space-around",
  },

  widgetContainer: {
    flex: 0.95,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    alignItems: "center",
    paddingLeft: "0%"
  },
  text: {
    fontSize: 25,
    fontWeight: '200',
    marginBottom: "5%",
  },
  stat: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "mainFont",
  },
  widget: {
    height: "35%",
    width: "40%",
    padding: "2.5%",
    alignItems: "center",
    justifyContent: "space-evenly",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    marginBottom: "5%",
    shadowOpacity: 0.5,
    shadowRadius: 5.0,
    paddingLeft: "2%",
    elevation: 10,
  },
});
