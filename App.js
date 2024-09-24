import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";
import GoalItem from "./components/GoalItem";

export default function App() {
  const appName = "Hello5520";
  const [isModalVisible, setModalVisible] = useState(false);

  const [goals, setGoals] = useState([]);

  const handleInputData = (data) => {
    setModalVisible(false);
    const newGoal = {
      text: data,
      id: Math.random().toString(),
    };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };
  const onCancel = () => {
    Alert.alert(
      "Confirm Cancel",
      "Are you sure you want to cancel?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => setModalVisible(false),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteGoalItem = (id) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
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
          onCancel={onCancel}
        />
        <Button title="Add a goal" onPress={() => setModalVisible(true)} />
      </View>
      <View style={styles.bottomView}>
        {/*         
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          bounces={true}
        >
          {goals.map((goal) => (
            <View key={goal.id} style={styles.textView}>
              <Text style={styles.text}>{goal.text}</Text>
            </View>
          ))}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.scrollContainer}
          data={goals}
          renderItem={({ item }) => (
            <GoalItem item={item} onDelete={handleDeleteGoalItem} />
          )}
        />
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
    flex: 1,
  },
  bottomView: {
    flex: 4,
    backgroundColor: "#d8bfd8",
  },
  scrollContainer: {
    alignItems: "center",
    rowGap: 5,
  },
});
