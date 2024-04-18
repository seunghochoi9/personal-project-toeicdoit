'use client'

import { useRouter } from "next/navigation"
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react"
import { Box, Button, Input, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from "next";
import { findAllBoards, findBoardById } from "@/app/component/board/service/board-service";
import BoardColumns from "@/app/component/board/module/boards-columns";
import { dir } from "console";
import { propsToClassKey } from "@mui/styles";
import { getBoardById } from "@/app/component/board/service/board-slice";
import { IBoard } from "@/app/component/board/model/board";
// import React from "react";


export default function BoardDetailPage({params}: any) {
    const dispatch = useDispatch()
    const board:IBoard = useSelector(getBoardById)

    useEffect(() => {
        dispatch(findBoardById(params.id))
    }, [])


    return (<>
        <h3>{params.id}번 게시판 상세</h3>
        <span>ID</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {params.id}</Typography>
        <span>게시판타입</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {params.boardType}</Typography>
        <span>등록일</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {params.regDate}</Typography>
        <span>수정일</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {params.modDate}</Typography>
    </>)
}