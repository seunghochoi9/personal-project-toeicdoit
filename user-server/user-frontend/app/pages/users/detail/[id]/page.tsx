'use client'
import { IArticle } from "@/app/component/article/model/article"
import { IUser } from "@/app/component/user/model/user"
import UserColumns from "@/app/component/user/module/users-columns"
import { findAllUsers, findUserById, userDeleteById } from "@/app/component/user/service/user-service"
import { getAllUsers, getUserById } from "@/app/component/user/service/user-slice"
import { Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function UserDetailPage({params}: any) {
    const dispatch = useDispatch()
    const user: IUser = useSelector(getUserById)
    const handleDelete = () => {
        alert("삭제완료")
        userDeleteById(user.id)
    }

    useEffect(() => { 
        dispatch(findUserById(params.id)) 
    }, [])


    return (<>
        <h2>{params.id}상세페이지</h2>
        <span>ID</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.id}</Typography>
        <span>username</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.username}</Typography>
        <span>password</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.password}</Typography>
        <span>name</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.name}</Typography>
        <span>phone</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.phone}</Typography>
        <span>job</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.job}</Typography>
        <span>regDate</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.regDate}</Typography>
        <span>modDate</span><Typography textAlign="center" sx={{ fontSize: "1.5rem" }}>  {user.modDate}</Typography><br />
        <div className="clearfix">
                <button onClick={handleDelete}>탈퇴</button>
                <button>수정</button>
            </div>
    </>)
}