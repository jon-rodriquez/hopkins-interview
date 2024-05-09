import { useEffect, useState } from 'react'
import { User } from '../assets/types/user.type'
import axios from 'axios'

type IntercomPageProps = {
    user: User | undefined
}

export const IntercomPage: React.FC<IntercomPageProps> = ({user}) => {
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<string>("All")
    const [message, setMessage] = useState<string>("")

    const grabAllUsers = async () => {
        const auth = localStorage.getItem('auth')

        const resp = await axios.get('/api/users/all', {
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        })

        return resp.data as User[]
    }
    useEffect(() => {
        try {
            grabAllUsers().then((data) => {
                setUsers(data.filter((user) => user.id != 1))
            })
        } catch (error) {
            console.log(error)
            alert('An error occurred getting users')
        }
    }, [])

    const onSendMessage = async () => {
        const auth = localStorage.getItem('auth')
        try {
            const resp = await axios.post(
                '/api/intercom/send',
                {
                    to: selectedUser,
                    message: message,
                    from: user?.name
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth}`,
                    },
                }
            )
            console.log(resp.data)
        } catch (error) {
            console.log(error)
            alert('An error occurred sending message')
        }
    }
    const selectOptions = users.map((user: User) => (
        <option key={user.id} value={user.email}>
            {user.name}
        </option>
    ))
    return (
        <div className="center">
            <p> Who do you want to message?</p>
            <select onChange={(e)=> setSelectedUser(e.target.value)}>
                <option value="All">All Users</option>
                {selectOptions}
            </select>
            <p>Message:</p>
            <textarea placeholder="Type your message here" onChange={(e)=>setMessage(e.target.value)}></textarea>
            <button onClick={()=>onSendMessage()}>Send</button>
        </div>
    )
}
