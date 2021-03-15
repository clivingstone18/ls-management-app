import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { calcRatio } from "./calcRatio";
import moment from "moment";
import UserService from "./services/UserService";
import AnimatedLoader from "react-native-animated-loader";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { print } from "./print";

const { height } = Dimensions.get("window");

export const PrintSheet = ({ currDate }) => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState();
  const [disabled, setDisabled] = useState(false);

  const handlePrint = () => {
    setDisabled(true);
    print(info, currDate)
      .then((res) => {
        setDisabled(false);
      })
      .catch((err) => {
        console.log(err);

        setDisabled(false);
      });
  };

  const [tableHead, setTableHead] = useState([
    "Time",
    "# nursery",
    "# kook",
    "# emus",
    "# kang",
    "# croc",
    "# children",
    "# staff",
    "# staff required",
    "Staff name",
  ]);

  const [tableData, setTableData] = useState([]);

  const processNames = (staff) => {
    let initials = "";
    for (let i = 0; i < staff.length; i++) {
      initials += staff[i].firstname[0] + "." + staff[i].lastname[0];
      if (i != staff.length - 1) {
        initials += "\n";
      }
    }
    return initials;
  };

  useEffect(() => {
    setLoading(true);
    // api call to get most recent
    let date = moment(currDate).format("YYYY-MM-DD");
    UserService.getClassDataOnDate(date)
      .then((res) => {
        setLoading(false);
        let classInfo = res.data[0].rows;
        let staffInfo = res.data[1].rows;
        const elements = classInfo.map((elem) => {
          let staffOnDuty = staffInfo.filter(
            (staff) => staff.entryid === elem.entryid
          );
          return [
            moment(elem.timeof, "HH:mm:ss").format("hh:mm A"),
            elem.numkoala,
            elem.numkook,
            elem.numemu,
            elem.numkang,
            elem.numcroc,
            elem.numkoala +
              elem.numkook +
              elem.numemu +
              elem.numkang +
              elem.numcroc,
            staffOnDuty.length,
            calcRatio(
              elem.numkoala,
              elem.numkook,
              elem.numemu + elem.numkang + elem.numcroc
            ),
            processNames(staffOnDuty),
          ];
        });
        setTableData(elements);
        setInfo(elements);
      })
      .catch((err) => setLoading(false));
  }, [currDate]);

  return (
    <View style={styles.container}>
      {loading ? (
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("./StaffDirectory/loader.json")}
          animationStyle={styles.lottie}
          speed={1}
        />
      ) : (
        <>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text style={styles.titleText}>
              Ratio Sheet for {moment(currDate).format("dddd, MMMM Do YYYY")}
            </Text>
            <TouchableOpacity
              onPress={handlePrint}
              disabled={disabled}
              style={{ color: disabled ? "#f3f3f3" : "black" }}
            >
              <FontAwesomeIcon icon={faPrint} size={20} />
            </TouchableOpacity>
          </View>

          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
        </>
      )}
    </View>
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
    height: 100,
  },
  text: { margin: 6 },
  scrollview: {
    flexGrow: 1,
  },
});
