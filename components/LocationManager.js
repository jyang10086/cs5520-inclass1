import React from "react";
import { View, Button } from "react-native";
import * as Location from "expo-location";

const LocationManager = () => {
  const [response, requestPermission] = Location.useForegroundPermissions();

  const verifyPermission = async () => {
    if (response?.granted) {
      return true;
    }

    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  };

  const locateUserHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      console.log("Location permission not granted.");
      return;
    }
    try {
      const location = await Location.getCurrentPositionAsync({});
      console.log(location)
    } catch (err) {
      console.log("get location error:", err);
    }
  };

  return (
    <View>
      <Button title="Locate User" onPress={locateUserHandler} />
    </View>
  );
};

export default LocationManager;
