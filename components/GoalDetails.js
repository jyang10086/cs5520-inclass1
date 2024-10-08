import { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
export default function GoalDetails({ navigation, route }) {
  const [textColor, setTextColor] = useState("black");

  const handleMoreDetails = () => {
    navigation.push("Details");
  };

  const handleWarningPress = () => {
    console.log('warning!')
    setTextColor("red");
    navigation.setOptions({ title: "Warning!" });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Warning" onPress={handleWarningPress} />
      ),
    });
  }, [navigation]);

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
