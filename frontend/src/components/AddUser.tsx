import React from 'react'
import axios from 'axios'
type AddUserProps = {
    onAdd: () => void
  show: boolean
}

export const AddUser: React.FC<AddUserProps> = ({show,  onAdd}) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  
  const addUser = () => {
    
    axios.post('/api/users/add', {
        
        name: name,
        email: email,
        password: password,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
    }).then(() => {
        setName('')
        setEmail('')
        setPassword('')
        onAdd()
  }).catch((err) => {
      const errorMessage = err?.response?.data?.message || 'An error occurred'
      alert(errorMessage)
  })
  }

  
  if(show) {
    return (
      <div className='center'>
        <input type="text" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}/>
        <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <button onClick={addUser}>SUBMIT</button>
      </div>
    )
  } else {
    return (
      <>
      </>
    )
  }
}
