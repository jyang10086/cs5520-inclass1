import { View, Text, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import LocationManager from "./LocationManager";
import NotificationManager from "./NotificationManager";

const Profile = () => {
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>UID: {user.uid}</Text>
      <LocationManager />
      <NotificationManager />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default Profile;
