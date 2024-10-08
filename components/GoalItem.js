import React from "react";
import { Button, View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function GoalItem({ item, onDelete }) {
  const navigation = useNavigation();
  const handlePressInfo = () => {
    navigation.navigate("Details", { item });
  };

  return (
    <Pressable onPress={handlePressInfo}>
      <View key={item.id} style={styles.textView}>
        <Text style={styles.text}>{item.text}</Text>
        <View style={styles.buttonView}>
          <Button title="X" color="grey" onPress={() => onDelete(item.id)} />
        </View>
        {/* <View style={styles.buttonView}>
          <Button title="i" color="grey" onPress={handlePressInfo} />
        </View> */}
      </View>
    </Pressable>
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
