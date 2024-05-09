import React, { useEffect, useState } from 'react'
import { User } from '../assets/types/user.type'
import { Navbar } from './Navbar'
import { useNavigate } from 'react-router-dom'
import { PageManager } from './PageManager'
import { io } from 'socket.io-client'

type DashboardProps = {
    user: User | undefined
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}
const socket = io('', {
  path: '/api/socket.io',
})
export const Dashboard: React.FC<DashboardProps> = ({ user, setUser }) => {
    const navigate = useNavigate()
    const [pageSelection, setPageSelection] = useState('Intercom') // This is a state that will be used to determine which page to render
    const [messages, setMessages] = useState<{ from: string; message: string }[]>([]) // This is a state that will be used to store messages

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    useEffect(() => {
        if (user) {
            socket.emit('LoggedIn', user)
        }
        socket.on('message', (data) => {
            console.log(data)
            setMessages((prev) => [data, ...prev])
        })

        return () => {
            socket.off('LoggedIn')
            socket.off('message')
        }
    }, [])

    const pageSelectionHandler = (page: string) => {
        if(page === 'Logout') {
            localStorage.removeItem('auth')
            navigate('/login')
            setUser(undefined)
        }else {
        setPageSelection(page)
    }
    }


    if (!user) {
        return <></>
    }
    return (
        <div>
            <Navbar user={user} setPageSelection={pageSelectionHandler} />
            <PageManager user={user} pageSelection={pageSelection} messages={messages} />
        </div>
    )
}
