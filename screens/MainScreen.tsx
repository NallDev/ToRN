import React, { useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadTodos, deleteTodo } from "@/redux/slice/todoSlice";
import { RootState, AppDispatch } from "../redux/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import TodoItem from "../components/TodoItem";

type MainScreenProps = NativeStackScreenProps<any, "Main">;

export default function MainScreen({ navigation }: MainScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.items);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-center text-blue-600 mb-4">
        To-Do List
      </Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onPress={() => navigation.navigate("TodoForm", { todo: item })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("TodoForm")}
        className="absolute bottom-8 right-8 bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
      >
        <Text className="text-white text-2xl">Tambah</Text>
      </TouchableOpacity>
    </View>
  );
}
