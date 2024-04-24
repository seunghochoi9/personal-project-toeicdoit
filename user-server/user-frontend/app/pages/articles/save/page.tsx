'use client'
import { AttachFile, FmdGood, ThumbUpAlt } from '@mui/icons-material';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { MyTypography } from '@/app/component/common/style/cell';
import { useRouter } from 'next/navigation';
import { PG } from '@/app/component/common/enums/PG';
import { useEffect, useState } from 'react';
import { IArticle } from '@/app/component/article/model/article';
import { useDispatch } from 'react-redux';
import { articleSave } from '@/app/component/article/service/article-service';
import { useSelector } from 'react-redux';
import { getArticleSave } from '@/app/component/article/service/article-slice';
import { findAllBoards } from '@/app/component/board/service/board-service';
import { getAllBoards } from '@/app/component/board/service/board-slice';
import { IBoard } from '@/app/component/board/model/board';
// import React from "react";



export default function ArticleSavePage() {
  const router = useRouter()
  const [article, setArticle] = useState({} as IArticle)
  const [boardId, setBoardId] = useState({} as IArticle)
  const dispatch = useDispatch()
  const result = useSelector(getArticleSave)
  const [content, setContent] = useState('')
  const allBoard:IBoard[] = useSelector(getAllBoards)


  useEffect(() => {
    // if (result.message === "SUCCESS") {
    //   // setCookie({}, 'message', auth.message, { httpOnly: false, path: '/' })
    //   // setCookie({}, 'token', auth.token, { httpOnly: false, path: '/' })
    //   router.push(`${PG.ARTICLE}/list/${id}`)
    // } else {
    //   console.log('LOGIN FAIL')
    // }
    dispatch(findAllBoards())
  }, [])

  const option = [allBoard[0], allBoard[1], allBoard[2]]
  const handleContent = (e: any) => {
    setArticle({ ...article, id: e.target.value })
    setBoardId(e.target.value)
    setContent(e.target.value)
    console.log(option)
  }

  const handleTitleInsert = (e: any) => {
    setArticle({ ...article, title: e.target.value })
  }
  const handleContentInsert = (e: any) => {
    setArticle({ ...article, content: e.target.value })
  }
  const handelCancel = () => {
    // id에 boardId 값 넣어야함
    // router.push(`${PG.ARTICLE}/list/${id}`)
  }
  const handleSubmit = () => {
    alert("작성완료")
    console.log('article...' + JSON.stringify(article))
    dispatch(articleSave(article))
  }

  return (<>

    <form className="max-w-sm mx-auto">
      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">board title 선택</label>
      <select onChange={handleContent} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {/* {options.map((item) => (<option key={item.id} value={item.id}>{item.title}</option>))} */}
        {allBoard.map((board) => (<option key={board.id} title={board.title}>{board.content}</option>))}
      </select>
    </form>

    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
      {MyTypography('Article 작성', "1.5rem")}
      <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" placeholder="Title" title="text" name="title" onChange={handleTitleInsert} />
      <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" placeholder="Describe everything about this post here" name="content" onChange={handleContentInsert}></textarea>
      {/* <!-- icons --> */}
      <div className="icons flex text-gray-500 m-2">
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <ThumbUpAltIcon component={ThumbUpAlt}></ThumbUpAltIcon>
        </svg>
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <FmdGoodIcon component={FmdGood}></FmdGoodIcon>
        </svg>
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <AttachFileIcon component={AttachFile}></AttachFileIcon>
        </svg>
        <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
      </div>
      {/* <!-- buttons --> */}
      <div className="buttons flex">
        <div className="btn  overflow-hidden relative w-30 bg-white text-blue-500 p-3 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
          onClick={handelCancel}>Cancel</div>
        <div className="btn  overflow-hidden relative w-30 bg-blue-500 text-white p-3 px-8 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
          onClick={handleSubmit}> Post </div>
      </div>
    </div>

  </>)

}

