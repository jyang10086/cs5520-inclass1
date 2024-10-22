import { FlatList, Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { writeToDB } from "../Firebase/firestoreHelper";

const GoalUsers = ({ id }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        data.forEach((user) => {
          writeToDB(`/goals/${id}/users`, user);
        });
        setUsers(data.map((user) => user.name));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList data={users} renderItem={({ item }) => <Text>{item}</Text>} />
    </View>
  );
};

export default GoalUsers;
const styles = StyleSheet.create({
  text: {
    padding: 10,
    borderRadius: 5,
    fontSize: 25,
    color: "purple",
    borderColor: "purple",
    borderWidth: 2,
  },
});
