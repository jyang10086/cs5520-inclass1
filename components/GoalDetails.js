import { Button, View, Text, StyleSheet } from "react-native";
export default function GoalDetails({route}) {
  const { item } = route.params;
  return (
    <View>
      <Text>Goal Details: {item.text} id: {item.id}</Text>
    </View>
  );
}
