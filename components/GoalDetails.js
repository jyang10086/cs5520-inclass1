import { useEffect, useState } from "react";
import { Button, Image, View, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import PressableButton from "./PressableButton";
import { updateFromDB } from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUsers";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";
export default function GoalDetails({ navigation, route }) {
  const [textColor, setTextColor] = useState("black");
  const [imageUrl, setImageUrl] = useState(null);
  const handleMoreDetails = () => {
    navigation.push("Details");
  };

  const handleWarningPress = () => {
    console.log("warning!");
    updateFromDB("goals", route.params.item.id, { warning: true });
    setTextColor("red");
    navigation.setOptions({ title: "Warning!" });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          pressedStyle={{ backgroundColor: "lightgray" }}
          onPress={handleWarningPress}
        >
          <AntDesign name="warning" size={24} color="white" />
        </PressableButton>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.item && route.params.item.warning) {
      setTextColor("red");
      navigation.setOptions({ title: "Warning!" });
    }
  }, [route.params?.item]);

  useEffect(() => {
    if (route.params?.item?.imageUri) {
      const fetchImageUrl = async () => {
        try {
          const reference = ref(storage, route.params?.item?.imageUri);
          const url = await getDownloadURL(reference);
          setImageUrl(url);
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      };
      fetchImageUrl();
    }
  }, [route.params?.item.imageUri]);

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
      {route.params && <GoalUsers id={route.params.item.id} />}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 200, height: 200, resizeMode: "cover" }}
        />
      )}
    </View>
  );
}
