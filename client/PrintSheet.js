import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView } from "react-native";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import { timeToStr, minsToNextUpdate } from "./TimeKeeper.js";
import { calcRatio } from "./calcRatio";

const { height } = Dimensions.get("window");

export const PrintSheet = (props) => {
  const [screenHeight, setScreenHeight] = useState(0);
  const scrollEnabled = screenHeight > height;

  const [tableHead, setTableHead] = useState([
    "Time",
    "# nursery",
    "# kookaburras",
    "# emus",
    "# kangaroos",
    "# children",
    "# staff",
    "# staff required",
    "Staff name",
  ]);

  const [tableData, setTableData] = useState([]);

  const processNames = (staff) => {
    let initials = "";
    for (let i = 0; i < staff.length; i++) {
      initials += staff[i].firstName[0] + "." + staff[i].lastName[0];
      if (i != staff.length - 1) {
        initials += "\n";
      }
    }
    return initials;
  };

  useEffect(() => {
    let info;
    if (props.info) {
      info = props.info;
    } else {
      info = props.route.params.info;
    }
    info = info.slice(1, info.length);
    const res = info.map((elem) => [
      timeToStr(elem.date),
      elem.numNursery,
      elem.numKook,
      elem.numEmus,
      elem.numKangaroos,
      elem.numNursery + elem.numKook + elem.numEmus + elem.numKangaroos,
      elem.staffOnDuty.length,
      calcRatio(
        elem.numNursery,
        elem.numKook,
        elem.numEmus + elem.numKangaroos
      ),
      processNames(elem.staffOnDuty),
    ]);
    setTableData(res);
  }, []);

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
        <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
  scrollview: {
    flexGrow: 1,
  },
});
