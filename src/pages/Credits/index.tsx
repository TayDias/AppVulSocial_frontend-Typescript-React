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

                <h2 className="head-title">Autores do projeto:</h2>
                <ul id="heads-list" className="heads-list">
                    <li className="head">
                        <p>
                            <strong>Prof. Daniella Pinto Vieira, MEng</strong>
                            <a href="https://www.linkedin.com/in/daniellavieira/" target="_blank">
                                <img src={linkedinIcon} alt="LinkedinDaniella" />
                            </a>
                        </p>
                        <p>Universidade do Sul de Santa Catarina  - UNISUL</p>
                        <p>Docente do curso de Sistemas de Informação</p>
                        <p>Coordenadora do Projeto</p>
                    </li>

                    <li className="head">
                        <p>
                            <strong>Taynara Muren Dias</strong>
                            <a href="https://www.linkedin.com/in/taynara-muren-dias-aa731b131/" target="_blank">
                                <img src={linkedinIcon} alt="LinkedinTaynara" />
                            </a>
                            <a href="https://github.com/TayDias" target="_blank">
                                <img src={githubIcon} alt="GithubTaynara" />
                            </a>
                        </p>
                        <p>Universidade do Sul de Santa Catarina - UNISUL</p>
                        <p>Graduanda do curso de Sistemas de Informação</p>
                        <p>Líder técnica do Projeto</p>
                    </li>

                    <li className="head">
                        <p>
                            <strong>Rosy Cândido</strong>
                        </p>
                        <p>Líder comunitária</p>
                        <p>Colaboradora</p>
                    </li>
                </ul>

                <h2 className="team-title">Colaboradores da UNISUL:</h2>
                <div id="team-list" className="team-list">
                    
                    <div id="team" className="team">
                        <p>Graduandos do curso de Sistemas de Informação:</p>

                        <ul className="devs" id="devs">
                            <li>André Wronscki Ricardo</li>

                            <li>Gabriel Ribeiro Barbosa</li>

                            <li>Jihad Aymen Mostafá</li>

                            <li>Maria Claudia Cardoso Bail</li>

                            <li>
                                Mateus da Cruz da Silva
                                <a href="https://www.linkedin.com/in/mateusofcz/" target="_blank">
                                    <img src={linkedinIcon} alt="LinkedinMateus" />
                                </a>
                                <a href="https://github.com/MateusOFCZ" target="_blank">
                                    <img src={githubIcon} alt="GithubMateus" />
                                </a>
                            </li>

                            <li>Miguel Cavalheiro de Jesus Junior</li>

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

                            <li>Vinicius Silva de Chaves</li>    
                        </ul>
                    </div>

                    <div id="team" className="team">
                        <p>Graduandos do curso de Direito:</p>

                        <ul className="support" id="support">
                            <li>Eliza Gonçalves</li>

                            <li>Indianára Leonel Schulz</li>

                            <li>Maria Julia Volpato Freitas</li>

                            <li>Natan Sbabbo</li> 
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Credits