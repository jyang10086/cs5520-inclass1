import { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
} from "react-native";
import ImageManager from "./ImageManager";
export default function Input({
  autoFocus,
  onCancel,
  handleInputData,
  visible,
}) {
  const [text, setText] = useState("");
  const [showCounter, setShowCounter] = useState(false);
  const [imageUri, setimageUri] = useState(null);

  const handleBlur = () => {
    setShowCounter(false);
  };

  const handleFocus = () => {
    setShowCounter(true);
  };

  const handleConfirm = () => {
    handleInputData({text, imageUri});
    setText("");
  };

  const handleCancel = () => {
    onCancel();
    setText("");
  };

  const getImageUri =  async(uri) => {
    setimageUri(uri);
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <View style={styles.modelContainer}>
          <View style={styles.imageView}>
            <ImageManager receiveImageUri={getImageUri} />
            {/* alt props is to support accessibility.It is used to 
            display when the image is not loaded or for use by assistive devices.*/}
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
              }}
              style={styles.image}
              alt="A goal image from network."
            />
            <Image
              source={require("../assets/goal.png")}
              style={styles.image}
              alt="A goal image from local."
            />
          </View>
          <TextInput
            autoFocus={autoFocus}
            style={styles.textInput}
            autoCorrect={true}
            keyboardType="default"
            placeholder="Type here."
            onChangeText={(newText) => setText(newText)}
            value={text}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />

          {showCounter && text.length > 0 && (
            <Text>{`Character count: ${text.length}`}</Text>
          )}

          <View style={styles.buttonView}>
            <View style={styles.button}>
              <Button
                style={styles.button}
                title="Cancel"
                onPress={handleCancel}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={handleConfirm}
                disabled={text.length < 3}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modelContainer: {
    width: 300,
    height: 400,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  textInput: {
    padding: 10,
    width: "90%",
    margin: 15,
    borderRadius: 5,
    fontSize: 16,
    borderColor: "purple",
    borderWidth: 2,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});
