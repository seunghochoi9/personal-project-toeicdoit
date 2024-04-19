import { createAsyncThunk } from "@reduxjs/toolkit";
import { articleDeleteByIdAPI, articleSaveAPI, findAllArticlesAPI, findArticleByIdAPI } from "./article-api";
import { IArticle } from "../model/article";


export const findAllArticles: any = createAsyncThunk(
    'articles/findAllArticles',
    async (id: number, { rejectWithValue }) => {
        console.log('findAllArticlesBy Board id:' + id)
        const data: any = await findAllArticlesAPI(id);
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

export const articleSave: any = createAsyncThunk('articles/articleSave',
    async (article: IArticle) => await articleSaveAPI(article))