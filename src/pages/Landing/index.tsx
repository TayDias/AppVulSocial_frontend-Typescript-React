import React, { useState } from 'react'
import { Link } from "react-router-dom";

import logo from '../../assets/images/logo-white.png'
import api from '../../services/api'
import Help from '../../components/FAQ'

import './styles.css'

function Landing() {
    const [helpItems, setHelpItems] = useState([{
        id: 0,
        url: '',
        title: '',
        desc: '',
        text: '',
        location: ''
    }])

    loadHelp("Landing");

    async function loadHelp(location: String) {
        if (!helpItems[0].id) {
            const response = await api.get('help', {
                params: {
                    location,
                }
            })

            setHelpItems(response.data)
        }
    }

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <h1>Vulnerabilidade Social APP</h1>
                    <h2>Ajude pessoas vulneráveis a ter uma voz e receber apoio.</h2>
                </div>

                <img src={logo} alt="logo" className="hero-image" />

                <div className="buttons-container">
                    <Link to="/register" className="register">
                        Quero Ajudar
                    </Link>
                    <Link to="/login" className="login">
                        Tenho Cadastro
                    </Link>
                </div>
            </div>
            <Help
                helpItems={helpItems}
            />
        </div>
    )
}

export default Landing