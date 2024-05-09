import React from 'react'
import { UsersPage } from './UsersPage'
import { User } from '../assets/types/user.type'

type PageManagerProps = {
  pageSelection: string
  user: User
}

export const PageManager: React.FC<PageManagerProps> = ({pageSelection, user}) => {

  let page 

  switch (pageSelection) {
    case 'Intercom':
      page = <h1>Intercom Page</h1>
      break
    case 'Users':
      page = <UsersPage user={user}/>
      break
    case 'Settings':
      page = <h1>Settings Page</h1>
      break
    case 'Logout':
      page = <h1>Logout Page</h1>
      break
    default:
      page = <h1>Intercom Page</h1>
  }

  return (
    <div>
      {page}    
    </div>
  )
}
