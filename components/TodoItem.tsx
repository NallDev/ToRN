import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TrashIcon } from "react-native-heroicons/solid";
import { Todo } from "@/redux/slice/todoSlice";

interface TodoItemProps {
  todo: Todo;
  onPress: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onPress, onDelete }) => (
  <View className="flex-row items-center justify-between p-4 mb-2 bg-gray-100 rounded shadow">
    <TouchableOpacity onPress={onPress} className="flex-1">
      <Text className="text-lg font-semibold text-gray-800">{todo.title}</Text>
      <Text className="text-sm text-gray-600">{todo.description}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onDelete}
      className="ml-4 p-2 bg-red-500 rounded-full"
    >
      <TrashIcon color="white" size={20} />
    </TouchableOpacity>
  </View>
);

export default TodoItem;
