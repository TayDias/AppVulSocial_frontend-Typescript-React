import { Link } from "react-router-dom"

import backIcon from '../../assets/images/icons/back-white.svg'

import './styles.css'

function Credits() {
    return (
        <div id="page-credits" className="page-credits">

            <div className="go-back">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
            </div>

            <div id="page-credits-content" className="page-credits-content">
                <h2>Heads:</h2>
                <ul id="heads-list" className="heads-list">
                    <li className="head"><strong>Daniella Pinto Vieira</strong></li>
                    <li className="head"><strong>Taynara Muren Dias</strong></li>
                    <li className="head"><strong>Rosy Cândido</strong></li>
                </ul>

                <h2>Equipe:</h2>
                <div id="team-list" className="team-list">
                    
                    <ul className="devs" id="devs">
                        <li>André Wronscki Ricardo</li>
                        <li>Gabriel Ribeiro Barbosa</li>
                        <li>Jihad Aymen Mostafá</li>
                        <li>Vinicius Silva de Chaves</li>
                        <li>Aluno 5</li>
                        <li>Aluno 6</li>
                        <li>Aluno 7</li>
                        <li>Aluno 8</li>
                        <li>Aluno 9</li>
                        <li>Aluno 10</li>
                    </ul>

                    <ul className="support" id="support">   
                        <li>Indianára Leonel Schulz</li>
                        <li>Maria Claudia Cardoso Bail</li>
                        <li>Aluno 3</li>
                        <li>Aluno 4</li>
                        <li>Aluno 5</li>
                        <li>Aluno 6</li>
                        <li>Aluno 7</li>
                        <li>Aluno 8</li>
                        <li>Aluno 9</li>
                        <li>Aluno 10</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Credits