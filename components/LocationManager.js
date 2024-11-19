import { useEffect, useState } from "react";
import { Alert, View, Button, Image } from "react-native";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUserLocation, saveUserLocation } from "../Firebase/firestoreHelper";

const MAPS_API_KEY = process.env.EXPO_PUBLIC_mapApikey;

const LocationManager = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();
  const [mapPreviewUrl, setMapPreviewUrl] = useState(null);
  const route = useRoute();

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
      Alert.alert("Location permission not granted.");
      return;
    }
    try {
      const userLocation = await Location.getCurrentPositionAsync({});
      const coord = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      };
      setLocation(coord);
    } catch (err) {
      console.log("locate user error:", err);
    }
  };

  // Check if a location was picked in Map.js and set it as the current location
  useEffect(() => {
    if (route.params?.selectedLocation) {
      setLocation(route.params.selectedLocation);
    }
  }, [route.params]);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const userData = await getUserLocation();
        if (userData) {
          setLocation(userData.location);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (location) {
      const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
      const params = new URLSearchParams({
        center: `${location.latitude},${location.longitude}`,
        zoom: "14",
        size: "400x200",
        maptype: "roadmap",
        markers: `color:red|label:L|${location.latitude},${location.longitude}`,
        key: MAPS_API_KEY,
      });
      setMapPreviewUrl(`${baseUrl}?${params.toString()}`);
    }
  }, [location]);

  const saveLocationHandler = () => {
    saveUserLocation(location);
  };
  return (
    <View>
      <Button title="Locate User" onPress={locateUserHandler} />
      {location && (
        <>
          <Image
            source={{ uri: mapPreviewUrl }}
            style={{ width: 400, height: 200 }}
          />
          <Button
            title="Open Map"
            onPress={() => navigation.navigate("MapScreen")}
          />
          <Button
            title="Save Location"
            onPress={saveLocationHandler}
            disabled={!location}
          />
        </>
      )}
    </View>
  );
};

export default LocationManager;
