import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Header from "./components/Header";
import { useState } from "react";

export default function App() {
  const appName = "Hello5520";
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <Header appName={appName} />
      <TextInput
        style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
        autoCorrect={true}
        keyboardType="default"
        placeholder="Type here."
        onChangeText={(newText) => setText(newText)}
        value={text}
      />
      <Text>{text}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
