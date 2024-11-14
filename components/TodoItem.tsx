import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Todo } from "@/redux/slice/todoSlice";
import { MaterialIcons } from "@expo/vector-icons";

interface TodoItemProps {
  todo: Todo;
  onPress: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onPress, onDelete }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.infoContainer} onPress={onPress}>
      <Text style={styles.title}>{todo.title}</Text>
      <Text style={styles.description}>{todo.description}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
      <MaterialIcons name="delete" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  deleteButton: {
    marginLeft: 16,
    backgroundColor: "#FF3B30",
    borderRadius: 20,
    padding: 8,
  },
});

export default TodoItem;
