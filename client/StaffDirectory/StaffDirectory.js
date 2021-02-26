import React from "react";
import {DiplomaInfo} from "./DiplomaInfo"
import {NewStaffForm} from "./NewStaffForm"
import {
  createStackNavigator,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

export const StaffDirectory = (props) => {
    let staffOnDuty = props.route.params.staffOnDuty
    let setStaffOnDuty = props.route.params.setStaffOnDuty
    let setResetting = props.route.params.setRestting
    return (
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="StaffDirectory">
                {props => <DiplomaInfo {...props} staffOnDuty={staffOnDuty} setStaffOnDuty={setStaffOnDuty} 
                setResetting={setResetting} />}
                
            </Stack.Screen> 
            
            <Stack.Screen name="NewStaffForm" component={NewStaffForm} />
          </Stack.Navigator>
      );
}