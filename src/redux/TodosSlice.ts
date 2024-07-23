import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type Todos = {
    userId: number;
    id: number;
    title: string;
    completed: boolean
}

type TodosTypes = {
    todos: Todos[]
    filter: string
    loading: boolean
}

const initialState: TodosTypes = {
    todos: [],
    filter: '',
    loading: false,
};

export const loadTodos = createAsyncThunk<Todos[]>(
    'todos/load',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        return response.json();
    }
);

const TodoSlice = createSlice({
    name: 'Todos',
    initialState,
    reducers: {
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadTodos.fulfilled, (state, action: PayloadAction<Todos[]>) => {
                state.loading = false;
                state.todos = action.payload;
            })
    },
});

export const { toggleTodo, deleteTodo } = TodoSlice.actions;
export default TodoSlice.reducer;