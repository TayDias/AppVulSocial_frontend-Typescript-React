import { Link } from "react-router-dom"

import backIcon from '../../assets/images/icons/back-white.svg'
import linkedinIcon from '../../assets/images/icons/linkedinIcon.png'
import githubIcon from '../../assets/images/icons/githubIcon.png'

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
                    <li className="head">
                        <strong>Daniella Pinto Vieira</strong>
                    </li>
                    <li className="head">
                        <strong>Taynara Muren Dias</strong>
                        <a href="https://www.linkedin.com/in/taynara-muren-dias-aa731b131/" target="_blank">
                            <img src={linkedinIcon} alt="Linkedin" />
                        </a>
                        <a href="https://github.com/TayDias" target="_blank">
                            <img src={githubIcon} alt="Github" />
                        </a>
                    </li>
                    <li className="head">
                        <strong>Rosy Cândido</strong>
                    </li>
                </ul>

                <h2>Colaboradores:</h2>
                <div id="team-list" className="team-list">
                    
                    <ul className="devs" id="devs">
                        <li>André Wronscki Ricardo</li>
                        <li>Gabriel Ribeiro Barbosa</li>
                        <li>Jihad Aymen Mostafá</li>
                        <li>Miguel Cavalheiro de Jesus Junior</li>
                        <li>
                            Mateus da Cruz da Silva
                            <a href="https://www.linkedin.com/in/mateusofcz/" target="_blank">
                                <img src={linkedinIcon} alt="LinkedinMateus" />
                            </a>
                            <a href="https://github.com/MateusOFCZ" target="_blank">
                                <img src={githubIcon} alt="GithubMateus" />
                            </a>
                        </li>
                        <li>Pedro Santos Sell</li>
                        <li>
                            Vinícius da Cruz da Silva
                            <a href="https://www.linkedin.com/in/viniciusdacruzdasilva/" target="_blank">
                                <img src={linkedinIcon} alt="LinkedinMateus" />
                            </a>
                            <a href="https://github.com/Vinicius-CS" target="_blank">
                                <img src={githubIcon} alt="GithubMateus" />
                            </a>
                        </li>             
                    </ul>

                    <ul className="support" id="support">
                        <li>Eliza Gonçalves</li>
                        <li>Indianára Leonel Schulz</li>
                        <li>Maria Claudia Cardoso Bail</li>
                        <li>Maria Julia Volpato Freitas</li>
                        <li>Natan Sbabbo</li> 
                        <li>Vinicius Silva de Chaves</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Credits