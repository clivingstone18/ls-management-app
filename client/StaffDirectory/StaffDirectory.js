import React from "react";
import {DiplomaInfo} from "./DiplomaInfo"
import {NewStaffForm} from "./NewStaffForm"
import {
  createStackNavigator,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

export const StaffDirectory = () => {
    return (
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="StaffDirectory" component={DiplomaInfo} />
            <Stack.Screen name="NewStaffForm" component={NewStaffForm} />
          </Stack.Navigator>
      );
}