import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo, Todo } from "@/redux/slice/todoSlice";
import { AppDispatch } from "../redux/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">
        {existingTodo ? "Update Todo" : "New Todo"}
      </Text>
      <TextInput
        className="border p-2 mb-4"
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="border p-2 mb-4"
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
