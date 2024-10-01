import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
export default function GoalItem({ item, onDelete, onPressInfo }) {
  return (
    <View key={item.id} style={styles.textView}>
      <Text style={styles.text}>{item.text}</Text>
      <View style={styles.buttonView}>
        <Button title="X" color="grey" onPress={() => onDelete(item.id)} />
      </View>
      <View style={styles.buttonView}>
        <Button title="i" color="grey" onPress={() => onPressInfo(item.id)} />
      </View>
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
    flexDirection: "row",
  },
  buttonView: {
    justifyContent: "center",
  },
});
