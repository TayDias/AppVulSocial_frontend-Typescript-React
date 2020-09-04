import React from 'react'
import { Link } from "react-router-dom";

import './styles.css'

function Landing() {
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <h1>Vulnerabilidade Social APP</h1>
                    <h2>Ajude pessoas vulneráveis a ter uma voz e receber apoio.</h2>
                </div>

                <img src="" alt="logo" className="hero-image" />

                <div className="buttons-container">
                    <Link to="/register" className="register">
                        Cadastrar-se
                    </Link>
                </div>
            </div>           
        </div>
    )
}

export default Landing