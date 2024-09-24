import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function GoalItem({ item }) {
  return (
    <View key={item.id} style={styles.textView}>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    color: "indigo",
    padding: 50,
    fontSize: 50,
  },
  textView: {
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "gray",
  },
});
