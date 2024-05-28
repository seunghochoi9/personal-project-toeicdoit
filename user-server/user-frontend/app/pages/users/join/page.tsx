'use client';
import { API } from '@/app/component/common/enums/API';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { NextPage } from 'next';
import { IUser } from '@/app/component/user/model/user';
import { getExistsId } from '@/app/component/user/service/user-slice';
import { useDispatch, useSelector } from 'react-redux';
import { existsId, save } from '@/app/component/user/service/user-service';
import { PG } from '@/app/component/common/enums/PG';
import MoveButton from '@/app/atoms/button/MoveButton';

const JoinPage: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [idCheck, setIdCheck] = useState('')
    const [user, setUser] = useState({} as IUser)
    const [pwCheck, setPwCheck] = useState('')
    const IsWrongId = useSelector(getExistsId)
    const PasswordRef = useRef<HTMLInputElement>(null);


    const handleUsername = (e: any) => {
        const ID_CHECK = /^[a-zA-Z][a-zA-Z0-9]{5,19}$/g;
        if (ID_CHECK.test(e.target.value)) {
            setIdCheck('true')
            setUser({ ...user, username: e.target.value })
        } else {
            setIdCheck('false')
        }
    }

    const handlePassword = (e: any) => {
        const PW_CHECK = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]).{7,19}$/g;
        if (PW_CHECK.test(e.target.value)) {
            setPwCheck('true')
            setUser({ ...user, password: e.target.value })
        } else {
            setPwCheck('false')
        }
    }

    const handleName = (e: any) => {
        setUser({ ...user, name: e.target.value })
    }

    const handlePhone = (e: any) => {
        setUser({ ...user, phone: e.target.value })
    }

    const handleAddressId = (e: any) => {
        setUser({ ...user, addressId: e.target.value })
    }

    const handleJob = (e: any) => {
        setUser({ ...user, job: e.target.value })
    }

    const handleSubmit = () => {
        console.log(user)
        dispatch(existsId(user.username))
            .then((res: any) => {
                if (res.payload.message === "FAILURE") {
                    dispatch(save(user))
                        .then((resp: any) => {
                            if (resp.payload.message === "SUCCESS") {
                                console.log('서버에서 넘어온 payload ' + JSON.stringify(resp))
                                console.log("회원 가입 성공")
                                // router.push(`${PG.HOME}`)
                                // router.refresh()
                            }
                        })
                        .catch((err: any) => {
                            console.log("회원 가입실패")
                        })
                } else {
                    console.log("아이디 중복")
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
    const handleIdCheck = () => {
        dispatch(existsId(user.username))
            .then((res: any) => {
                if (res.payload.message === "FAILURE") {
                    alert("사용 가능한 아이디입니다.")
                } else {
                    alert("이미 사용중인 아이디입니다.")
                }
            })
            .catch((err: any) => {
                console.log("아이디 중복 확인 실패")
            })
    }


    return (<>
        <div className="container">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />

            <label htmlFor="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" required onChange={handleUsername} /><br />
            <h6>*영어 시작하는 6~20자의 영어 대소문자 또는 숫자</h6>
            {idCheck === 'false' && (<pre><h6 className="text-red-700">사용 불가한 아이디 입니다.</h6></pre>)}
            {idCheck === 'true' && (<pre><h6 className="text-green-700">사용 가능한 아이디 입니다.</h6></pre>)}
            <button type="submit" className="signupbtn" onClick={handleIdCheck}>ID 중복 확인</button><br /><br />


            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required onChange={handlePassword} /><br />
            <h2>영어 대소문자 , 숫자, 특수문자 각 1개씩 필요, 8~20</h2><br />
            {pwCheck === 'false' && (<pre><h6 className="text-red-700">사용 불가한 비밀번호 입니다.</h6></pre>)}
            {pwCheck === 'true' && (<pre><h6 className="text-green-700">사용 가능한 비밀번호 입니다.</h6></pre>)}<br />

            <label htmlFor="name"><b>Name</b></label>
            <input type="name" placeholder="Enter Name" name="name" required onChange={handleName} /><br />

            <label htmlFor="phone"><b>Phone</b></label>
            <input type="phone" placeholder="Enter Phone" name="phone" required onChange={handlePhone} /><br />

            <label htmlFor="email"><b>email</b></label>
            <input type="email" placeholder="Enter email" name="email" required onChange={handleAddressId} /><br />

            <label htmlFor="job"><b>Job</b></label>
            <input type="job" placeholder="Enter Job" name="job" required onChange={handleJob} /><br /><br /><br />

            {/* <label>
                <input type="checkbox" checked={true} name="remember" style={{ marginBottom: "15px" }} /> Remember me
            </label> */}

            {/* <p>By creating an account you agree to our <a href="#" style={{ color: "dodgerblue" }}>Terms & Privacy</a>.</p> */}

            <div className="clearfix">
                <button type="button" className="cancelbtn">Cancel</button><br /><br />
                <button type="submit" className="signupbtn" onClick={handleSubmit}>Sign Up</button>
            </div>
        </div>
    </>)

}

export default JoinPage;