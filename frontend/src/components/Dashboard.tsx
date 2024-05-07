import React from 'react'
import { User } from '../assets/types/user.type'

type DashboardProps = {
    user: User | undefined
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    return <div>Dashboard: {user?.name}</div>
}
