import { View, Text, Dimensions, useWindowDimensions } from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//uopdate this variable to change the app name
export default function Header({ appName }) {
  const { width, height } = useWindowDimensions();
  return (
    <View>
      <Text style={[styles.text, { paddingVertical: height < 415 ? 0 : 10 }]}>
        Welcome to {appName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 10,
    borderRadius: 5,
    fontSize: 25,
    color: "purple",
    borderColor: "purple",
    borderWidth: 2,
  },
});
