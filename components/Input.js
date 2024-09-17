import { useState } from "react";
import { Button, Text, TextInput } from "react-native";
export default function Input({ autoFocus, handleInputData }) {
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
    console.log(text);
    handleInputData(text);
  };

  return (
    <>
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
      <Button
        title="Confirm"
        onPress={handleConfirm}
      />
    </>
  );
}
