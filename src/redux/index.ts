import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './UsersSlice'
import TodoReducer from './TodosSlice'

export const store = configureStore({
    reducer: {
        todos: TodoReducer,
        users: UserReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch