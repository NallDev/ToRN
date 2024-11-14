import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Todo {
  id: number;
  title: string;
  description: string;
}

interface TodosState {
  items: Todo[];
  status: "idle" | "loading" | "loaded";
}

export const loadTodos = createAsyncThunk<Todo[]>("todos/load", async () => {
  const todos = await AsyncStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
});

const initialState: TodosState = {
  items: [],
  status: "idle",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
      AsyncStorage.setItem("todos", JSON.stringify(state.items));
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const { id, title, description } = action.payload;
      const existingTodo = state.items.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.description = description;
        AsyncStorage.setItem("todos", JSON.stringify(state.items));
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
      AsyncStorage.setItem("todos", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTodos.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "loaded";
    });
  },
});

export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
