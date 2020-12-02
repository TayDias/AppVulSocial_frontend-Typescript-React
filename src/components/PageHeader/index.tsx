import React from 'react'
import { Link } from "react-router-dom"

import logo from '../../assets/images/logo2.svg'
import backIcon from '../../assets/images/icons/back-white.svg'

import './styles.css'

interface PageHeaderProps {
    title: string
    description?: string
    logout?: any
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                {!props.logout ?
                    <Link to="/">
                        <img src={backIcon} alt="Voltar" />
                    </Link>
                :
                    <div onClick={props.logout} className="logout">
                        <img src={backIcon} alt="Voltar" />
                    </div>
                }
                <img src={logo} alt="Logo" />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                { props.description && <p>{props.description}</p> }

            </div>
        </header>
    )
}

export default PageHeader