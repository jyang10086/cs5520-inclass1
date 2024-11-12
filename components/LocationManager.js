import { useState } from "react";
import { Alert, View, Button, Image } from "react-native";
import * as Location from "expo-location";

const MAPS_API_KEY = process.env.EXPO_PUBLIC_mapApikey;

const LocationManager = () => {
  const [location, setLocation] = useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();

  const verifyPermission = async () => {
    if (response?.granted) {
      return true;
    }

    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  };

  const mapPreviewUrl = location
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`
    : null;

  const locateUserHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      Alert.alert("Location permission not granted.");
      return;
    }
    try {
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    } catch (err) {
      console.log("locate user error:", err);
    }
  };

  return (
    <View>
      <Button title="Locate User" onPress={locateUserHandler} />
      {location && (
        <Image
          source={{ uri: mapPreviewUrl }}
          style={{ width: 400, height: 200 }}
        />
      )}
    </View>
  );
};

export default LocationManager;
