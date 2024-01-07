import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from '../../../../server/src/models/user/user.model';
import { Url } from "../../assets/url/Url";

export interface UsersState {
    loading: 'pending' | 'succeeded' | 'failed' | 'idle',
    info: User,
    error:string
}

interface User {
    userId: string,
    userEmail: string,
    userPicture: string,
    userLastName: string,
    userFirstName: string
}

const initialState: UsersState = {
    loading: 'idle',
    info: {
        userId: "",
        userEmail: "",
        userPicture: "",
        userLastName: "",
        userFirstName: ""
    },
    error:""
};

//Create the thunk

export const userConnected = createAsyncThunk<User, string>("users/userConnected",
    async (token: string) => {
        const response = await axios.get(Url.userConnected, {
            headers: {
                Authorization: `Bearer ` + JSON.parse(token)
            }
        });

        return response.data;
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userConnected.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = "succeeded";
            state.info = action.payload;
            state.error=""
        });

        builder.addCase(userConnected.pending, (state) => {
            state.loading = "pending"
        });

        builder.addCase(userConnected.rejected, (state, action) => {
            state.loading = "failed";
            state.error= action.error.message as string
        })
    }
})

//export  userConnected  = userSlice.actions;
export default userSlice.reducer;


