import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export const ButtonAll = (props) => {
  return (
    <Button
      title={props.title}
      background="#f194ff"
      onPress={props.handlePress}
    />
  );
};
