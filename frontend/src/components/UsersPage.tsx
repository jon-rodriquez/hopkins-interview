import { useEffect, useState } from 'react'
import { User } from '../assets/types/user.type'
import axios from 'axios'


export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])

  const getAllUsers = async () => {
    const auth = localStorage.getItem('auth')
    
   const resp = await  axios.get('/api/users/all', {
      headers: {
        'Authorization': `Bearer ${auth}`
      }
    })

  return resp.data as User[]
  }
   
  useEffect( () => {
    try {
      getAllUsers().then((data) => { setUsers(data) })
    } catch (error) {
    console.log(error)
      alert('An error occurred getting users') 
    }
}, [])

  const userRows = users.map((user: User) => 
      <div  className="card" key={user.id}>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
  )

   return (
    <div style={{ marginTop: "10px"}}>
      <button> Add User +</button> 
      {userRows}
    </div>
  )
}
