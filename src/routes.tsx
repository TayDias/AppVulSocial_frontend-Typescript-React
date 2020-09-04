import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Landing from './pages/Landing'
import Register from './pages/Register'

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Landing} path="/" exact />
            <Route component={Register} path="/register" />
        </BrowserRouter>
    )
}

export default Routes