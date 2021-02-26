import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { UpdateInfo } from "./UpdateInfo";
import { Home } from "./Home";
import { DateSheetTimeChanger } from "./DateSheetTimeChanger";
import { ChangeTeacher } from "./ChangeTeacher";
import { StaffDirectory } from "./StaffDirectory/StaffDirectory";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UpdateInfo" component={UpdateInfo} />
        <Stack.Screen name="PrintSheet" component={DateSheetTimeChanger} />
        <Stack.Screen name="ChangeTeacher" component={ChangeTeacher} />
        <Stack.Screen name="StaffDirectory" component={StaffDirectory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});

export default App;
