import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Chat from './pages/Chat'

//import { isAuthenticated } from './services/auth'

//Criar a rota profile como privada

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Landing} path="/" exact />
            <Route component={Register} path="/register" />
            <Route component={Login} path="/login" />
            <Route component={Profile} path="/profile" />
            <Route component={Chat} path="/chat" />
        </BrowserRouter>
    )
}

export default Routes