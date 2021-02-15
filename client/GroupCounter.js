import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const GroupCounter = ({count, setCount}) => {
    return (
        <View style={{display:"flex", flexDirection: "row", width: "100%",
         justifyContent: "space-evenly", paddingTop: "2%", paddingBottom: "2%"         
         }}>
            <TouchableOpacity onPress={() => { if (count<1) return; else setCount(count-1)}}>
                <Text style={styles.boldText}>-</Text>
            </TouchableOpacity>
        
            <Text style={styles.text}>{count}</Text>
            <TouchableOpacity onPress={() => setCount(count+1)}>
            <Text style={styles.boldText}>+</Text>

            </TouchableOpacity>
            </View>

    )
}



const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        fontFamily: "mainFont",
    },
    boldText: {
        fontSize: 24,


    }
})