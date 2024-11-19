import { useEffect } from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";

const NotificationManager = () => {
  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Cannot schedule notifications without permission."
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    requestPermissions();
  }, []);
  const verifyPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You need to grant notification permissions to set reminders."
        );
        return false;
      }
    }
    return true;
  };

  // Function to handle scheduling a notification
  const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) return;
      // Define notification content and trigger
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder",
          body: "This is your scheduled reminder!",
          sound: true, // Play a sound when the notification arrives
        },
        trigger: {
          seconds: 2, // Notification will appear after 10 seconds
        },
      });

      Alert.alert(
        "Notification Scheduled",
        `Notification ID: ${notificationId}`
      );
    } catch (err) {
      console.error("Error scheduling notification:", err);
      Alert.alert("Error", "Failed to schedule the notification.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Set Reminder" onPress={scheduleNotificationHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: "center",
  },
});

export default NotificationManager;
