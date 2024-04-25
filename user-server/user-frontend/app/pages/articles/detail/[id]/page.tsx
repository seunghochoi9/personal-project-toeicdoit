'use client'
import { useState, useEffect } from "react"
import { Box, Button, Input, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { articleDeleteById, findAllArticles, findArticleById } from "@/app/component/article/service/article-service";
import { getAllArticles, getArticleById } from "@/app/component/article/service/article-slice";
import { IArticle } from "@/app/component/article/model/article";

export default function ArticleDetailPage({ params }: any) {
    const dispatch = useDispatch()
    const article: IArticle = useSelector(getArticleById)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
// const update:[] = [title, content]

    const handleDelete = () => {
        alert("삭제완료")
        dispatch(articleDeleteById(article.id))
    }

    const handleUpdate = () => {
        alert("수정완료")
        // dispatch(articleUpdate())
    }
    const handleTitle = (e: any) => {
        setTitle(e.target.value)
    }
    const handleContent = (e: any) => {
        setContent(e.target.value)
    }


    useEffect(() => {
        dispatch(findArticleById(params.id))
        console.log(article)
    }, [])


    return (<>
        <h3>{article.id}번 게시판 상세</h3>
        <span>ID</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {article.id}</Typography>
        <span>title</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {article.title}</Typography>
        <span>content</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {article.content}</Typography>
        <span>registerDate</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {article.registerDate}</Typography>
        <span>writer</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {article.modDate}</Typography>
        <span>regDate</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {article.regDate}</Typography>
        <span>modDate</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {article.modDate} </Typography>
        <div className="clearfix">
            <button onClick={handleDelete}>게시글 삭제</button>
        </div><br />
        <h3>제목 수정</h3>
        <input type="text" onChange={handleTitle} /><br /><br />
        <h3>내용 수정</h3>
        <input type="text" onChange={handleContent} /><br /><br />
        <button onClick={handleUpdate}>수정하기</button>
    </>)
}