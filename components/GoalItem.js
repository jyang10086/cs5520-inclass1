import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
export default function GoalItem({ item, onDelete }) {
  return (
    <View key={item.id} style={styles.textView}>
      <Text style={styles.text}>{item.text}</Text>
      <View style={styles.buttonView}>
        <Button title="X" color='grey' onPress={() => onDelete(item.id)} />
      </View>
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
    backgroundColor: "#aaa",
    flexDirection: "row",
  },
  buttonView: {
    justifyContent:'center',
  },
});
