import React, { SetStateAction, Dispatch, useEffect } from 'react'
import { User } from '../assets/types/user.type'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type LogInProps = {
    user: User | undefined
    setUser: Dispatch<SetStateAction<User | undefined>>
}

export const LoginPage: React.FC<LogInProps> = ({ user, setUser }) => {
    let email = ''
    let password = ''

    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        } else {
            navigate('/login')
        }
    }, [user, navigate])

    const handleLogin = () => {
        axios
            .post('/api/login', {
                email: email,
                password: password,
            })
            .then((res) => {
                const respData: { user: User; auth: { token: string } } =
                    res?.data
                setUser(respData.user)
                localStorage.setItem('auth', respData.auth.token)
            })
            .catch((err) => {
                const errorMessage =
                    err?.response?.data?.message || 'An error occurred'
                alert(errorMessage)
            })
    }

    return (
        <div>
            <h1>Login Page</h1>
            <input
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => (email = e.target.value)}
            />
            <input
                id="pasword"
                type="password"
                placeholder="Password"
                onChange={(e) => (password = e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}
