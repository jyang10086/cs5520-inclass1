import React from "react";
import { Button, View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";

export default function GoalItem({ item, onDelete }) {
  const navigation = useNavigation();
  const handlePressInfo = () => {
    navigation.navigate("Details", { item });
  };

  return (
    <View key={item.id} style={styles.textView}>
      <Pressable
        style={({ pressed }) => [
          styles.horizontalView,
          pressed && styles.pressedStyle, // Apply pressed state style conditionally
        ]}
        onPress={handlePressInfo}
        android_ripple={{ color: "red", radius: 25 }}
      >
        <Text style={styles.text}>{item.text}</Text>
        <PressableButton
          onPress={() => onDelete(item.id)}
          componentStyle={styles.buttonView}
          pressedStyle={styles.pressedStyle}
        >
          <Text style={{ color: "white" }}>X</Text>
        </PressableButton>
        {/* <View style={styles.buttonView}>
          <Button title="X" color="grey" onPress={() => onDelete(item.id)} />
        </View> */}
        {/* <View style={styles.buttonView}>
          <Button title="i" color="grey" onPress={handlePressInfo} />
        </View> */}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    color: "indigo",
    padding: 10,
    fontSize: 20,
  },
  textView: {
    borderRadius: 5,
    backgroundColor: "#aaa",
  },
  horizontalView: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonView: {
    justifyContent: "center",
    padding:10,
  },
  pressedStyle: {
    backgroundColor: 'grey',
    opacity: 0.2,
  },
});
