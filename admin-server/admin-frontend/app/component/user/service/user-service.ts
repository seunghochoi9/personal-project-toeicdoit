import { createAsyncThunk } from "@reduxjs/toolkit";
import { findAllUsersAPI, findUserByIdAPI, loginAPI, userDeleteByIdAPI } from "./user-api";
import { IUser } from "../model/user";


export const findAllUsers: any = createAsyncThunk(
    'users/findAllUsers',
    async (page: number) => {
        console.log('findAllUsers page : ' + page)
        const data: any = await findAllUsersAPI(page);
        const { message, result }: any = data
        return data
    }
)

export const findUserById: any = createAsyncThunk(
    'users/findUserById',
    async (id: number, { rejectWithValue }) => {
        console.log('findUserById id : ' + id)
        const data: any = await findUserByIdAPI(id);
        const { message, result }: any = data
        return data
    }
)

export const userDeleteById: any = createAsyncThunk(
    'users/userDeleteById',
    async (id: number, { rejectWithValue }) => {
        console.log('findUserById id : ' + id)
        const data: any = await userDeleteByIdAPI(id);
        const { message, result }: any = data
        return data
    }
)

export const login: any = createAsyncThunk('users/login',
    async (user:IUser) => await loginAPI(user)
)