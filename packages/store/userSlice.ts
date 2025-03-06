import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    username: string | null;
    market: "en" | "ca" | null;
}

const initialState: UserState = {
    username: null,
    market: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ username: string; market: "en" | "ca" }>) => {
            state.username = action.payload.username;
            state.market = action.payload.market;
        },
        logout: (state) => {
            state.username = null;
            state.market = null;
        }
    }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
