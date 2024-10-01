import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
            headerRight: () => {
              return <Button title="Warning" />;
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
