import { createAsyncThunk } from "@reduxjs/toolkit";
import { articleDeleteByIdAPI, findAllArticlesAPI, findArticleByIdAPI } from "./article-api";


export const findAllArticles: any = createAsyncThunk(
    'articles/findAllArticles',
    async (page: number, { rejectWithValue }) => {
        console.log('findAllArticles page:' + page)

        const data: any = await findAllArticlesAPI(page);

        const { message, result }: any = data
        return data
    }
)

export const findArticleById: any = createAsyncThunk(
    'articles/findArticleById',
    async (id: number, { rejectWithValue }) => {
        console.log('findArticleById id:' + id)
        const data: any = await findArticleByIdAPI(id);
        const { message, result }: any = data
        return data
    }
)

export const articleDeleteById: any = createAsyncThunk(
    'articles/articleDeleteById',
    async (id: number, { rejectWithValue }) => {
        console.log('articleDeleteById id:' + id)
        const data: any = await articleDeleteByIdAPI(id);
        const { message, result }: any = data
        return data
    }
)
