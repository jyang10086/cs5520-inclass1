import { useState } from "react";
import { Text, TextInput } from "react-native";
export default function Input() {
  const [text, setText] = useState("");
  return (
    <TextInput
      style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
      autoCorrect={true}
      keyboardType="default"
      placeholder="Type here."
      onChangeText={(newText) => setText(newText)}
      value={text}
    />
  );
}
