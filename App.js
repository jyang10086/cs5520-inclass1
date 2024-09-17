import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";

export default function App() {
  const appName = "Hello5520";
  const [inputData, setInputData] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleInputData = (data) => {
    setModalVisible(false);
    setInputData(data)
  };

  return (
    <View style={styles.container}>
      <Header appName={appName} />
      <Input
        visible={isModalVisible}
        autoFocus={true}
        handleInputData={handleInputData}
      />
      <Text>{inputData}</Text>
      <Button title="Add a goal" onPress={() => setModalVisible(true)} />
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
