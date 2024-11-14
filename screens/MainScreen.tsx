import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadTodos, deleteTodo } from "@/redux/slice/todoSlice";
import { RootState, AppDispatch } from "../redux/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "../components/Header";
import TodoItem from "../components/TodoItem";
import AddTodoButton from "../components/AddTodoButton";

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
    <View style={styles.container}>
      <Header />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onPress={() => navigation.navigate("TodoForm", { todo: item })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
      <AddTodoButton onPress={() => navigation.navigate("TodoForm")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  listContainer: {
    padding: 16,
  },
});
