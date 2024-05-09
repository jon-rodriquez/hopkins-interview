import { useEffect, useState } from "react"
import { User } from "../assets/types/user.type"
import axios from 'axios'

export const IntercomPage = () => {
  
  const [users, setUsers] = useState<User[]>([])

  const grabAllUsers = async () => {
    const auth = localStorage.getItem('auth')
    
    const resp = await axios.get('/api/users/all', {
      headers: {
        "Authorization": `Bearer ${auth}`
      }
    })

    return resp.data as User[]
  }
  useEffect(() => {
    try {
      grabAllUsers().then((data) => { setUsers(data.filter( user => user.id !=  1)) })
    } catch (error) {
      console.log(error)
      alert('An error occurred getting users')
    }
  }
  , [])

  const selectOptions = users.map((user: User) => 
    <option key={user.id} value={user.id}>{user.name}</option>
  )
  return (
    <div className="center">
      <p> Who do you want to message?</p>
      <select>
        <option value="0">All Users</option>
        {selectOptions}
      </select>
      <p>Message:</p>
      <textarea placeholder="Type your message here"></textarea>
      <button>Send</button>
    </div>
  )
}
