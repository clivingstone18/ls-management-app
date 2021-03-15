import React from "react";
import {DiplomaInfo} from "./DiplomaInfo"
import {NewStaffForm} from "./NewStaffForm"
import {
  createStackNavigator,
} from "@react-navigation/stack";
import {StaffContextProvider} from "./StaffContext"

const Stack = createStackNavigator();

export const StaffDirectory = (props) => {
    let staffOnDuty = props.route.params.staffOnDuty
    let setStaffOnDuty = props.route.params.setStaffOnDuty
    let staff = props.route.params.staff
    let setStaff = props.route.params.setStaff

    return (
      <StaffContextProvider>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="StaffDirectory">
                {props => <DiplomaInfo {...props} staffOnDuty={staffOnDuty} setStaffOnDuty={setStaffOnDuty} 
                staff = {staff} setStaff ={setStaff}/>}
            </Stack.Screen> 
            <Stack.Screen name="NewStaffForm">
              {props => <NewStaffForm {...props} setStaff={setStaff}/>}
              </Stack.Screen> 
          </Stack.Navigator>
          </StaffContextProvider>
      );
}