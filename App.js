import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseSetup";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
const Stack = createNativeStackNavigator();

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user)
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
        options={{
          title: "My goals",
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Details"
        component={GoalDetails}
        options={({ route }) => ({
          title: route.params?.item.text || "More Details",
        })}
      />
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
