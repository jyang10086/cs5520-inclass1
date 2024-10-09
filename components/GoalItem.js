import React from "react";
import { Alert, View, Text, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";

export default function GoalItem({ item, onDelete }) {
  const navigation = useNavigation();
  const handlePressInfo = () => {
    navigation.navigate("Details", { item });
  };

  const handleLongPress = () => {
    Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => onDelete(item.id),
        style: "destructive",
      },
    ]);
  };

  return (
    <View key={item.id} style={styles.textView}>
      <Pressable
        style={({ pressed }) => [
          styles.horizontalView,
          pressed && styles.pressedStyle, // Apply pressed state style conditionally
        ]}
        onLongPress={handleLongPress}
        onPress={handlePressInfo}
        android_ripple={{ color: "red", radius: 25 }}
      >
        <Text style={styles.text}>{item.text}</Text>
        <PressableButton
          onPress={() => onDelete(item.id)}
          componentStyle={styles.buttonView}
          pressedStyle={styles.pressedStyle}
        >
          <AntDesign name="delete" size={24} color="black" />
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
    padding: 10,
  },
  pressedStyle: {
    backgroundColor: "grey",
    opacity: 0.2,
  },
});
