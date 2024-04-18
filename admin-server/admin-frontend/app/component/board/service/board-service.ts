import { createAsyncThunk } from "@reduxjs/toolkit";
import { findAllBoardsAPI, findBoardByIdAPI } from "./board-api";


export const findAllBoards: any = createAsyncThunk(
    'boards/findAllBoards',
    async (page: number)=> await findAllBoardsAPI(page)
)

export const findBoardById: any = createAsyncThunk(
    'boards/findBoardById',
    async (id: number)=> await findBoardByIdAPI(id)
)