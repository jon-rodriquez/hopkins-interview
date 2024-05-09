import { useEffect, useState } from 'react'
import { User } from '../assets/types/user.type'
import axios from 'axios'
import deleteIcon from '../assets/MdCancel.svg'


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
  
  const deleteUser = async (id: number | undefined) => {
    try {
      
    if(!id) throw new Error('No user id provided')
    const auth = localStorage.getItem('auth')
    
    await axios.delete(`/api/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${auth}`
      }
    })
    getAllUsers().then((data) => { setUsers(data) })
    } catch (error: unknown) {
      const errorMessage= error?.response?.data?.message || error?.message || 'An error occurred deleting user'
      alert(errorMessage) 

        
    }
  
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
        <a onClick={()=>deleteUser(user?.id)}><img src={deleteIcon} alt="delete" style={{width: "20px", height: "20px", float: "right"}}/></a>
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
