import { useState } from "react";
import { View, Button, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImageManager = () => {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);
  const verifyPermission = async () => {
    try {
      if (response.granted) {
        return true;
      }
      const requestResponse = await requestPermission();
      return requestResponse.granted;
    } catch (err) {
      console.log("verify permission", err);
    }
  };
  const takeImageHandler = async () => {
    try {
      const hasPermission = verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true, // Allow user to edit the image
      });

      // Check if the image picking was canceled
      if (!result.canceled) {
        console.log(result.assets[0].uri)
        setImageUri(result.assets[0].uri); // Get URI from the first asset
      }
    } catch (err) {
      Alert.alert("An error occurred while trying to open the camera.");
      console.error(err);
    }
  };

  return (
    <View>
      <Button title="Open Camera" onPress={takeImageHandler} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{width: 200, height:300}}/>
      )}
    </View>
  );
};

export default ImageManager;
