import { instance } from "@/app/component/common/configs/axios-config"
import { IUser } from "../model/user"

export const findAllUsersAPI = async (page: number) =>{
    try{
        const response = await instance.get('/users/list',{
            params: {page, limit: 10}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const findUserByIdAPI = async (id:number) =>{
    try{
        const response = await instance.get(`/users/detail` ,{params: {id}})
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const userDeleteByIdAPI = async (id:number) =>{
    try{
        const response = await instance.delete(`/users/delete` , {params: {id}})
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const loginAPI = async (user:IUser) =>{
    try{
        const response = await instance.post(`/users/login` , user)
        //java에서 Messenger.message에 값을 담음
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const existsIdAPI = async (username:IUser) =>{
    try{
        const response = await instance.get(`/users/exists-username` , {params: {username}})
        //java에서 Messenger.message에 값을 담음
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}