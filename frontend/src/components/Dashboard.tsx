import React, { useEffect, useState } from 'react'
import { User } from '../assets/types/user.type'
import { Navbar } from './Navbar'
import { useNavigate } from 'react-router-dom'
import { PageManager } from './PageManager'

type DashboardProps = {
    user: User | undefined
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    const navigate = useNavigate()
    const [pageSelection, setPageSelection] = useState("Intercom") // This is a state that will be used to determine which page to render

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

    if (!user) {
        return <></>
    }
    return (
        <div>
            <Navbar user={user} setPageSelection={setPageSelection} />
            <PageManager pageSelection={pageSelection} />
        </div>
    )
}
