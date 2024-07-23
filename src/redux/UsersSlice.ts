import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
    id: number;
    name: string;
    email: string;
    address: {
        street: string,
        suite: string
        city: string
        zipcode: string
        geo: {
            lng: string
            lat: string
        }
    }
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}

type UserTypes = {
    users: User[]
    loading: boolean
}

const initialState: UserTypes = {
    users: [],
    loading: false,
};

export const loadUsers = createAsyncThunk(
    'users/loadUsers',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    }
);

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload
            });
    },
});
export default userSlice.reducer;