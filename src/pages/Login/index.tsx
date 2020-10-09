import React, { FormEvent, useState } from 'react'
import { Link } from "react-router-dom"
import { useHistory } from 'react-router'

import { login } from '../../services/auth'
import api from '../../services/api'

import backIcon from '../../assets/images/icons/back-white.svg'

import './styles.css'

function Login() {
    const history = useHistory()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(e: FormEvent) {
        e.preventDefault()

        try {
            const response = await api.post('/login', { email, password })
            
            login(response.headers.authorization)
            localStorage.setItem('rescuer_id', response.data.id)

            history.push('/profile')
        } 
        catch (err) {
            alert('Houve um problema ao realizar o login, verifique suas credenciais.')
        }
    }

    return (
        <div id="page-login" className="container">
            <div className="go-back">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
            </div>
            
            <form onSubmit={handleLogin}>
                <h1>LOGIN</h1>

                <input 
                    name="email" 
                    placeholder="E-MAIL" 
                    value={email} 
                    type="email" 
                    onChange={(e) => { setEmail(e.target.value) }} 
                />

                <input 
                    name="password" 
                    placeholder="SENHA" 
                    type="password" 
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <button type="submit">
                    ACESSAR
                </button>
            </form>
        </div>
    )
}

export default Login