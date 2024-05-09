import React, { Dispatch, SetStateAction } from 'react'
import { User } from '../assets/types/user.type'

type NavbarProps = {
    user: User
    setPageSelection: (page: string) => void
}
type navItems = {
    name: string
    path: string
}

type navmap = {
    admin: Array<navItems>
    baseUser: Array<navItems>
}
export const Navbar: React.FC<NavbarProps> = ({ user, setPageSelection }) => {
    const navItemsMap: navmap = {
        admin: [
            {
                name: 'Intercom',
                path: '/intercom',
            },
            {
                name: 'Users',
                path: '/users',
            },
            {
                name: 'Logout',
                path: '/logout',
            },
        ],
        baseUser: [
            {
                name: 'Intercom',
                path: '/intercom',
            },
            {
                name: 'Logout',
                path: '/logout',
            },
        ],
    }
    const navItems = navItemsMap[user.role].map((item) => {
        return (
            <a key={item.name} onClick={() => setPageSelection(item.name)}>
                {item.name}
            </a>
        )
    })

    return <>{navItems}</>
}
