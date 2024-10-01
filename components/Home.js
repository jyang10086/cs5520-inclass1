import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";
export default function Home({ navigation }) {
  const appName = "Hello5520";
  const [isModalVisible, setModalVisible] = useState(false);

  const [goals, setGoals] = useState([]);

  const navigateToDetails = () => {
    navigation.navigate("Details"); // Navigating to the Details screen
  };

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

  const renderHeader = () => {
    if (goals.length > 0) {
      return <Text style={styles.listText}>My Goals</Text>;
    }
    return null;
  };

  const renderFooter = () => {
    if (goals.length > 0) {
      return <Button title="Delete All" onPress={deleteAllGoals} />;
    }
    return null;
  };

  const deleteAllGoals = () => {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => setGoals([]),
        },
      ]
    );
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
            <GoalItem item={item} onDelete={handleDeleteGoalItem} onPressInfo={navigateToDetails}/>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.listText}>No goals to show</Text>
          )}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
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
  listText: {
    color: "indigo",
    fontSize: 18,
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: "indigo",
    marginVertical: 10,
  },
});
