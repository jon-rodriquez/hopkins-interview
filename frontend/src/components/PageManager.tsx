import React from 'react'
import { UsersPage } from './UsersPage'
import { User } from '../assets/types/user.type'
import { IntercomPage } from './IntercomPage'

type PageManagerProps = {
    pageSelection: string
    user: User
    messages: { from: string; message: string }[]
}

export const PageManager: React.FC<PageManagerProps> = ({ pageSelection, user, messages }) => {
    let page

    switch (pageSelection) {
        case 'Intercom':
            page = <IntercomPage user={user} messages={messages}/>
            break
        case 'Users':
            page = <UsersPage />
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

    return <div>{page}</div>
}
