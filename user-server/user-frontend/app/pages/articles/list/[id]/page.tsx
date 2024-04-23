'use client'

import { useRouter } from "next/navigation"
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react"
import { Box, Button, Input } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from "next";
import { findAllArticles } from "@/app/component/article/service/article-service";
import ArticlesColumns from "@/app/component/article/module/articles-columns";
import { getAllArticles } from "@/app/component/article/service/article-slice";
import MoveButton from "@/app/atoms/button/MoveButton";
import { PG } from "@/app/component/common/enums/PG";
// import React from "react";




const ArticleListPage: NextPage = ({params}:any) => {
  const dispatch = useDispatch()
  const allArticles: [] = useSelector(getAllArticles)
  
  useEffect(() => {
    dispatch(findAllArticles(params.id))
  }, [])

  return (<>
    <h2>게시글 목록</h2>
    <Box sx={{ height: 400, width: '100%' }}>
      {allArticles && <DataGrid
        rows={allArticles}
        columns={ArticlesColumns()}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />}
    </Box>
    <MoveButton text={"글쓰기"} path={`${PG.ARTICLE}/save`}/>
  </>)
}

export default ArticleListPage