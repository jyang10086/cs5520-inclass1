import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";

export default function App() {
  const appName = "Hello5520";
  const [inputData, setInputData] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const handleInputData = (data) => {
    setModalVisible(false);
    setInputData(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header appName={appName} />
        <Input
          visible={isModalVisible}
          autoFocus={true}
          handleInputData={handleInputData}
        />
        <Button title="Add a goal" onPress={() => setModalVisible(true)} />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.text}>{inputData}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    flex: 1
  },
  bottomView: {
    flex: 4,
    backgroundColor: "#d8bfd8",
    alignItems: "center",
  },
  text: {
    margin: 10,
    color: "blue",
  },
});
