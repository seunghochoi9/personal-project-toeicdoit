'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API } from '@/app/component/common/enums/API';
import AxiosConfig from '@/app/component/common/configs/axios-config';
import { NextPage } from 'next';

const LoginPage: NextPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();

    const handleUsername = (e: any) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e: any) => {
        setPassword(e.target.value)
    }

    const handleSubmit = () => {
        alert('request가 가져가는 이름' + username)
        const url = `${API.SERVER}/login`
        const data = { username, password }
        axios.post(url, data, AxiosConfig())
            .then(res => {
                const message = res.data.message
                alert(message)
                if (message == "SUCCESS") {
                    router.push("/articles")
                } else if (message == "WRONG_PASSWORD") {
                    alert("비밀번호가 틀립니다.");
                } else if (message == "FAIL") {
                    alert("아이디가 틀립니다.");
                } else {
                    alert("지정된 값이 없음.");
                }
            })
    }

    return (<>
        <div>로그인 화면</div>
        <h2>아이디, 비번</h2>
        <input type="text" onChange={handleUsername} /><br /><br />
        <input type="text" onChange={handlePassword} /><br /><br />
        <button onClick={handleSubmit}>전송</button>
    </>);

}

export default LoginPage;