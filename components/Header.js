import { Text, View, StyleSheet } from "react-native";
export default function Header({ appName }) {
  return (
    <View>
      <Text style={styles.text}>Welcome to {appName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 10,
    borderRadius: 5,
    fontSize: 25,
    color: "purple",
    borderColor: "purple", 
    borderWidth: 2
  },
});
