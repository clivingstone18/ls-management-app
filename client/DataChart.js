import React from "react";
import {
    View,
    Dimensions,
    Text,
  } from "react-native";
import {
    LineChart,

  } from "react-native-chart-kit";

  const screenWidth = Dimensions.get("window").width * 0.9;
  const screenHeight = Dimensions.get("window").height * 0.7;

  export const DataChart = (props) => {
      if (props.y.length == 0) {
          return <View><Text style={{
            fontFamily: "mainFont",
            fontSize: 25,
            marginBottom: "5%",
          }}>No data recorded.</Text></View>
      }
      if (props.y.length) {
      return(
          <View style={{padding: "1%", marginTop: "-5%"}}>

    <LineChart
      data={{
        labels: props.x,
        datasets: [
          {
            data: props.y
          }
        ]
      }}
      width={screenWidth} // from react-native
      height={screenHeight}
      verticalLabelRotation={-35}
      fromZero={true}
      xLabelsOffset={50}
      yAxisInterval={"10"} // optional, defaults to 1
      chartConfig={chartConfig}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  </View>
      
      )}
    }

    const chartConfig = {
        backgroundColor: "gray",
        backgroundGradientFrom: "navy",
        backgroundGradientTo: "#f3f3f3",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16,
          },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "gray"
        }
      };