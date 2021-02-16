import React, { FormEvent, useState } from 'react'
import { Link } from "react-router-dom"
import { useHistory } from 'react-router'

import { login } from '../../services/auth'
import AlertDialog from '../../components/AlertDialog'
import api from '../../services/api'

import backIcon from '../../assets/images/icons/back-white.svg'

import './styles.css'

function Login() {
    const history = useHistory()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [alertData, changeAlertData]  = useState({
        title: "",
        descripton: "",
        optionOne: "",
        optionTwo: "",
        type: ""
    })
    
    const [alertDialogIsOpen, changeAlertDialogStatus ] = useState(false)

    /* FUNÇOES EXCLUSIVAS DE CONTROLE DA INTERFACE */
    async function handleOpenAlert() {
        changeAlertDialogStatus(true)
    }
    
    async function handleCloseAlert () {
        changeAlertDialogStatus(false)
    }

    function choseAlertData(option: string) {
        if (option === "wrongUser"){
            changeAlertData({
                title: "Ops!",
                descripton: "Sinto muito, este espaço é reservado para a rede de atendimento. No futuro a rede de vulneráveis terá um espaço aqui só para si!",
                optionOne: "Ok",
                optionTwo: "",
                type: "confirm"
            })
        }
        if (option === "error"){
            changeAlertData({
                title: "Ops!",
                descripton: "Ocorreu um erro ao na tentativa de fazer o login. Por favor, verifique suas credenciais e tente novamente.",
                optionOne: "Ok!",
                optionTwo: "",
                type: "confirm"
            })
        }  
    }

    /* FUNÇOES DE OPERAÇÕES EM BANCO DE DADOS */
    async function handleLogin(e: FormEvent) {
        e.preventDefault()

        try {
            const response = await api.post('/login', { email, password })

            if (!response.data.isRescuer) {
                choseAlertData("wrongUser")
                handleOpenAlert()

            }

            else {
                login(response.data.token)
                localStorage.setItem('rescuer_id', response.data.id)

                history.push('/profile')
            }
            
        } 
        catch (err) {
            choseAlertData("error")
            handleOpenAlert()

        }
    }

    return (
        <div id="page-login" className="container">
            <AlertDialog 
                alertProps = {alertData}
                isOpen = {alertDialogIsOpen}
                onAccept= {() => {}}
                onClose= {handleCloseAlert}
            />

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