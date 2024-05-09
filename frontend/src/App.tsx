import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LoginPage } from './components/LoginPage'
import { User } from './assets/types/user.type'
import { Dashboard } from './components/Dashboard'

function App() {
    const [user, setUser] = useState<User | undefined>()

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage user={user} setUser={setUser} />}
                />
                <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser}/>} />
                <Route
                    path="/"
                    element={<LoginPage user={user} setUser={setUser} />}
                />
            </Routes>
        </Router>
    )
}

export default App
