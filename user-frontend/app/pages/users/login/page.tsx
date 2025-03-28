'use client';
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { existsId, login } from "@/app/component/user/service/user-service";
import { getAuth, getExistsId } from "@/app/component/user/service/user-slice";
import { IUser } from "@/app/component/user/model/user";
import { parseCookies, setCookie } from "nookies";
import { jwtDecode } from "jwt-decode";
import { PG } from "@/app/component/common/enums/PG";


export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const PasswordRef = useRef<HTMLInputElement>(null);
    const [user, setUser] = useState({} as IUser)

    const handleUsername = (e: any) => {
        setUser({ ...user, username: e.target.value })
    }

    const handlePassword = (e: any) => {
        setUser({ ...user, password: e.target.value })
    }

    const handleClick=async()=>{
      router.push(`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`);
  }

    const handleSubmit = () => {
        dispatch(existsId(user.username))
            .then((res: any) => {
                if (res.payload.message === "SUCCESS") {
                    console.log("아이디 체크 확인")
                    dispatch(login(user))
                        .then((resp: any) => {
                            if (resp.payload.message === "SUCCESS") {
                                console.log('서버에서 넘어온 payload ' + JSON.stringify(resp))
                                setCookie({}, 'message', resp.payload.message, { httpOnly: false, path: '/' })
                                setCookie({}, 'accessToken', resp.payload.accessToken, { httpOnly: false, path: '/' })
                                console.log('서버에서 넘어온 메세지 ' + parseCookies().message)
                                console.log('서버에서 넘어온 토큰 ' + parseCookies().accessToken)
                                console.log("토큰을 jwtDecode(언박싱)한 내용" + JSON.stringify(jwtDecode<any>(parseCookies().accessToken)))
                                alert("로그인 성공")
                                router.push(`${PG.HOME}`)
                            } else {
                                alert("비밀번호가 틀립니다. 다시 시도해 주세요.")
                            }
                        })
                        .catch((err: any) => { })
                } else {
                  alert("아이디 틀립니다. 다시 시도해 주세요.")
                }
            })
            .catch((err: any) => { })
            .finally(() => {
                console.log("최종적으로 반드시 이뤄져야 할 로직")
            })
        if (PasswordRef.current) {
            PasswordRef.current.value = "";
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-gray-200">Sign in to your account</p>
          </div>
    
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input 
                onChange={handleUsername}
                id="email" 
                type="email" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter your email" 
                required 
              />
            </div>
    
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input 
                onChange={handlePassword}
                id="password" 
                type="password" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter your password"
                required 
              />
              <button  
              onClick={handleClick}
              className="text-xs text-blue-500 hover:text-blue-700 mt-1">google 로그인</button> 
            </div>
    
            <div className="flex items-center justify-between">
              <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Sign In
              </button>
              <Link href={`${PG.USER}/join`} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Create an Account
              </Link>
            </div>
    
            {/* Removed Sign in with Google Section */}
          </div>
    
          <div className="text-center mt-4 text-gray-200">
            <div>테스트계정</div>
            <p>Clarinda</p>
            <p>Boilermaker1!</p>
          </div>
        </div>
      );
    }