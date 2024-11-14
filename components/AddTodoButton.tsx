import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { PlusIcon } from "react-native-heroicons/solid";

interface AddTodoButtonProps {
  onPress: () => void;
}

const AddTodoButton: React.FC<AddTodoButtonProps> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="absolute bottom-8 right-8 bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
  >
    <PlusIcon size={24} color="white" />
  </TouchableOpacity>
);

export default AddTodoButton;
