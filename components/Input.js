import { useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";
export default function Input({ autoFocus, handleInputData, visible }) {
  const [text, setText] = useState("");
  const [showCounter, setShowCounter] = useState(false);
  const [message, setMessage] = useState("");

  const handleBlur = () => {
    setShowCounter(false);
    if (text.length >= 3) {
      setMessage("Thank you");
    } else {
      setMessage("Please type more than 3 characters");
    }
  };

  const handleFocus = () => {
    setShowCounter(true);
    setMessage("");
  };

  const handleConfirm = () => {
    handleInputData(text);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <TextInput
          autoFocus={autoFocus}
          style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
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

        {message.length > 0 && <Text>{message}</Text>}
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
});
