import { useState } from "react";
import { Alert, View, StyleSheet, TextInput, Button, Text } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseSetup";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      Alert.alert(
        "Invalid password",
        "Password must be at least 6 characters."
      );
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    if (!validateInputs()) return;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      navigation.replace("Home");
      Alert.alert("Success", "You are logged in!");
    } catch (error) {
      console.log(error)
      Alert.alert("Login failed", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email Address</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.text}>password</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="New User? Create an account"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    rowGap: 10,
    margin: 10,
  },
  text: {
    fontSize: 15,
  },
  textInput: {
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    borderWidth: 2,
  },
});
