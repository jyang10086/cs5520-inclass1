import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={styles.naviContainer}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
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
