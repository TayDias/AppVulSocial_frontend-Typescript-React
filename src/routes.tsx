import React from 'react'
import { Route, BrowserRouter, Redirect, RouteProps } from 'react-router-dom'

import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import Admin from './pages/Admin'

import { isAuthenticated } from './services/auth'

interface PrivateRouteProps extends RouteProps {
    component: any;
}

//Criar a rota profile como privada
const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props

    return (
        <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
            <Component {...props} />
            ) : (
                    <Redirect 
                        to={{ pathname: '/', 
                        state: { from: props.location } }} 
                    />)}
        />
    )
}

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Landing} path="/" exact />
            <Route component={Register} path="/register" />
            <Route component={Login} path="/login" />
            <PrivateRoute component={Profile} path="/profile" />
            <PrivateRoute component={Chat} path="/chat" />
            <PrivateRoute component={Admin} path="/admin"/>
        </BrowserRouter>
    )
}

export default Routes