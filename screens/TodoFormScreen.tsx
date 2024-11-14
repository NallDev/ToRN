import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo, Todo } from "@/redux/slice/todoSlice";
import { AppDispatch } from "../redux/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "@/components/Header";

type TodoFormScreenProps = NativeStackScreenProps<any, "TodoForm">;

export default function TodoFormScreen({
  route,
  navigation,
}: TodoFormScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const existingTodo: Todo | undefined = route.params?.todo;

  const [title, setTitle] = useState(existingTodo ? existingTodo.title : "");
  const [description, setDescription] = useState(
    existingTodo ? existingTodo.description : ""
  );

  useEffect(() => {
    if (existingTodo) {
      setTitle(existingTodo.title);
      setDescription(existingTodo.description);
    }
  }, [existingTodo]);

  const handleSave = () => {
    if (existingTodo) {
      dispatch(updateTodo({ id: existingTodo.id, title, description }));
    } else {
      dispatch(
        addTodo({
          id: Date.now(),
          title,
          description,
        })
      );
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {existingTodo ? "Update Todo" : "New Todo"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#999"
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#999"
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
