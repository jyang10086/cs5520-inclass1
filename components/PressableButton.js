import { Pressable, View, StyleSheet } from "react-native";

const PressableButton = ({
  onPress,
  children,
  componentStyle,
  pressedStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.defaultStyle,
        componentStyle,
        pressed && styles.defaultPressedStyle,
        pressed && pressedStyle,
      ]}
    >
      <View>{children}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: "transparent",
  },
  defaultPressedStyle: {
    opacity: 0.2,
  },
});

export default PressableButton;
