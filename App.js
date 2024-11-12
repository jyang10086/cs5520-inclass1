import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase/firebaseSetup";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AntDesign from "@expo/vector-icons/AntDesign";
import Profile from "./components/Profile";
import PressableButton from "./components/PressableButton";
import MapScreen from "./components/Map";
const Stack = createNativeStackNavigator();

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert("Success", "You have been logged out.");
    } catch (error) {
      console.error("Sign out error:", error); // Log error to console
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);
  const authStack = (
    <>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </>
  );
  const appStack = (
    <>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation, route }) => ({
          title: "My goals",
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "white",
          headerRight: () => (
            <PressableButton onPress={() => navigation.navigate("Profile")}>
              <AntDesign name="user" size={24} color="white" />
            </PressableButton>
          ),
        })}
      />
      <Stack.Screen
        name="Details"
        component={GoalDetails}
        options={({ route }) => ({
          title: route.params?.item.text || "More Details",
        })}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation, route }) => ({
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "white",
          headerRight: () => (
            <PressableButton onPress={handleSignOut}>
              <AntDesign name="logout" size={24} color="white" />
            </PressableButton>
          ),
        })}
      />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </>
  );
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={styles.naviContainer}>
        {isUserLoggedIn ? appStack : authStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  naviContainer: {
    headerStyle: { backgroundColor: "purple" },
    headerTintColor: "white",
  },
});
