import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";
import {
  Alert,
  Button,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Platform,
} from "react-native";
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import {
  deleteAll,
  deleteFromDB,
  writeToDB,
} from "../Firebase/firestoreHelper";
import { database, storage } from "../Firebase/firebaseSetup";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { auth } from "../Firebase/firebaseSetup";
export default function Home({ navigation }) {
  const appName = "Hello5520";
  const [isModalVisible, setModalVisible] = useState(false);

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(database, "goals"),
        where("owner", "==", auth.currentUser.uid) // Filtering goals where owner matches the current user's UID
      ),
      (querySnapshot) => {
        const updatedGoals = querySnapshot.docs.map((snapDoc) => ({
          ...snapDoc.data(),
          id: snapDoc.id, // Adding document ID
        }));
        setGoals(updatedGoals); // Assuming setGoals is a function to update state
      },
      (error) => {
        console.log(error); // Handling any potential errors
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getPushToken = async () => {
      // Get the Expo push token
      const pushToken = await Notifications.getExpoPushTokenAsync({
        projectId: "1bb343a3-bb1f-4f60-85a3-4e66a2bdf9cc", // Add your projectId here
      });
      console.log(pushToken)

    };
    getPushToken();
  }, []);

  const fetchImage = async (uri) => {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw Error(`An error happened`, response.status);
      }
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputData = async (data) => {
    setModalVisible(false);
    const newGoal = {
      text: data.text,
      id: Math.random().toString(),
      owner: auth.currentUser.uid,
    };
    if (data.imageUri) {
      const uri = await fetchImage(data.imageUri);
      newGoal.imageUri = uri;
    }
    writeToDB("goals", newGoal);
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
    deleteFromDB("goals", id);
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
          onPress: () => deleteAll("goals"),
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
        <PressableButton
          componentStyle={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Add a goal</Text>
        </PressableButton>
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
          renderItem={({ item, separators }) => (
            <GoalItem
              item={item}
              onDelete={handleDeleteGoalItem}
              separators={separators}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.listText}>No goals to show</Text>
          )}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={[
                styles.separator,
                highlighted && styles.highlightedSeparator,
              ]}
            />
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
  listText: {
    color: "indigo",
    fontSize: 18,
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: "grey",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "indigo",
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  highlightedSeparator: {
    backgroundColor: "indigo",
  },
});
