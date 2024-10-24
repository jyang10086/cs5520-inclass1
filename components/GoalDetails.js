import { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import PressableButton from "./PressableButton";
import { updateFromDB } from "../Firebase/firestoreHelper";
export default function GoalDetails({ navigation, route }) {
  const [textColor, setTextColor] = useState("black");
  const handleMoreDetails = () => {
    navigation.push("Details");
  };

  const handleWarningPress = () => {
    console.log("warning!");
    updateFromDB("goals", route.params.item.id, { warning: true });
    setTextColor("red");
    navigation.setOptions({ title: "Warning!" });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          pressedStyle={{ backgroundColor: "lightgray" }}
          onPress={handleWarningPress}
        >
          <AntDesign name="warning" size={24} color="white" />
        </PressableButton>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params.item && route.params.item.warning) {
      setTextColor("red");
      navigation.setOptions({ title: "Warning!" });
    }
  }, [route.params.item]);

  return (
    <View>
      {route.params ? (
        <Text style={{ color: textColor }}>
          Goal Details: {route.params.item.text} id: {route.params.item.id}
        </Text>
      ) : (
        <Text style={{ color: textColor }}>More Details</Text>
      )}
      <Button title="More Details" onPress={handleMoreDetails} />
    </View>
  );
}
