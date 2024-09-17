import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";

export default function App() {
  const appName = "Hello5520";
  const [inputData, setInputData] = useState('');

  const handleInputData = (data) => {
    setInputData(data);
  };

  return (
    <View style={styles.container}>
      <Header appName={appName} />
      <Input autoFocus={true} handleInputData={handleInputData} />
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
