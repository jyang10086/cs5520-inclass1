import { Button, View, Text } from "react-native";
export default function GoalDetails({ navigation, route }) {
  const handleMoreDetails = () => {
    navigation.push("Details");
  };

  return (
    <View>
      {route.params ? (
        <Text>
          Goal Details: {route.params.item.text} id: {route.params.item.id}
        </Text>
      ) : (
        <Text>More Detail</Text>
      )}
      <Button title="More Details" onPress={handleMoreDetails} />
    </View>
  );
}
