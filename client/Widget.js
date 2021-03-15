import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export const Widget = ({handleOnPress, title, disabled, icon}) => {
    return(
    <View style={styles.container}>
    <TouchableOpacity
      onPress={handleOnPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
      <FontAwesomeIcon
        style={{ alignSelf: "center" }}
        icon={icon}
        size={32}
      />
    </TouchableOpacity>
  </View>
    )
}

const styles = StyleSheet.create({
    container: {
      height: "35%",
      width: "45%",
      padding: "2%",
      alignItems: "center",
      justifyContent: "space-evenly",
      textAlign: "center",
      backgroundColor: "white",
      borderRadius: 15,
      marginBottom: "5%",
      paddingLeft: "2%",
    },
    text: {
        fontSize: 25,
        fontWeight: '100',
        marginBottom: "5%",
      },
});