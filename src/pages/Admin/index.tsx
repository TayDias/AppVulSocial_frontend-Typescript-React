import React, { FormEvent, useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import PageHeader from '../../components/PageHeader'
import Admin from '../../components/Admin'
import AlertDialog from '../../components/AlertDialog'

import './styles.css'

import api from '../../services/api'
import { logout } from '../../services/auth'

function Profile() {
    const history = useHistory()
    const rescuer_id = localStorage.getItem('rescuer_id')
    const rescuer_type = localStorage.getItem('rescuer_type')

    const [menuOption, setMenuOption] = useState("usuarios")
    const [usuariosClassname, setUsuariosClassname] = useState("on")
    const [atendimentosClassname, setAtendimentosClassname] = useState("off")

    const [adminItems, setAdminItems] = useState([{
        id: 0,
        name: "",
        type: "",
        avaliable: 1,
        phone: "",
        email: "",
        bio: "",
        password: "",
    }])

    // Controle de alterações não salvas
    const [changeItems, setChangeItems] = useState(false)

    const [userData, setUserData] = useState({
        name: "",
        type: "",
        email: "",
        bio: "",
        available: 1
    })

    // Defaut alert props
    const [alertData, changeAlertData] = useState({
        title: "",
        descripton: "",
        optionOne: "",
        optionTwo: "",
        type: ""
    })

    function choseAlertData(option: string) {
        if (option === "logout") {
            changeAlertData({
                title: "Atenção!",
                descripton: "Deseja mesmo encerrar sua sessão?",
                optionOne: "Permanecer",
                optionTwo: "Encerrar Agora",
                type: "choose"
            })

            changeAlertOnAcceptFunction(() => handleAcceptedLogout)
        }
    }

    // Variaveis de controle da msg de alerta
    const [alertDialogIsOpen, changeAlertDialogStatus] = useState(false)
    const [alertOnAcceptFunction, changeAlertOnAcceptFunction] = useState(() => handleAcceptedLogout)


    // FUNÇOES EXCLUSIVAS DE CONTROLE DA INTERFACE //
    function changeMenuOption(id: string) {
        if (id === "usuarios") {
            loadAdmin()
            setMenuOption("usuarios")
            setUsuariosClassname("on")
            setAtendimentosClassname("off")
        }
        if (id === "atendimento") {
            setMenuOption("notification")
            setAtendimentosClassname("on")
            setUsuariosClassname("off")
        }
    }

    async function handleLogout() {
        choseAlertData("logout")
        handleOpenAlert()
    }

    async function handleAcceptedLogout() {
        logout()
        history.push('/')
    }

    // FUNÇOES DE GERENCIAMENTO DE MENSAGEM DE ALERTA //
    useEffect(() => {
        if (alertDialogIsOpen) {
            if (alertData.type === 'visualize') {
                setTimeout(() => {
                    handleCloseAlert()
                }, 2500)    //tempo de permanencia do alerta na tela
            }
        }

    }, [alertDialogIsOpen])

    async function handleOpenAlert() {
        changeAlertDialogStatus(true)
    }

    async function handleCloseAlert() {
        changeAlertDialogStatus(false)
    }

    // FUNÇOES DE OPERAÇÕES EM BANCO DE DADOS - CRUD //
    useEffect(() => {
        if (rescuer_id && rescuer_type === "Admin") {
            loadUserInformation()
            loadAdmin()
        }
        else if (rescuer_id === null) {
            history.push('/login')
        }
        else if (rescuer_type != "Admin") {
            history.push('/login')
        }

    }, [history, rescuer_id])

    async function loadAdmin() {
        const response = await api.get('admin')

        setAdminItems(response.data)
    }

    async function loadUserInformation() {
        let id = rescuer_id
        const response = await api.get(`rescuers/${id}`)

        setUserData(response.data)
    }

    return (
        <div id="page-profile" className="container">
            <AlertDialog
                alertProps={alertData}
                isOpen={alertDialogIsOpen}
                onAccept={alertOnAcceptFunction}
                onClose={handleCloseAlert}
            />

            <PageHeader
                title={`Olá ${userData.name}, que bom que você está aqui agora!`}
                description="Você pode ver aqui quem está precisando de ajuda  e organizar sua agenda."
                logout={handleLogout}
            />

            <form id="menu-items">
                <div className="input-block">
                    <button
                        type="button"
                        id="usuarios"
                        className={usuariosClassname}
                        onClick={() => changeMenuOption("usuarios")}
                    >
                        Usuários
                    </button>
                </div>
                <div className="input-block">
                    <button
                        type="button"
                        id="atendimento"
                        className={atendimentosClassname}
                        onClick={() => changeMenuOption("atendimento")}
                    >
                        Atendimentos
                    </button>
                </div>
            </form>

            <main>
                {menuOption === "usuarios" ?
                    <div>
                        {adminItems[0] ?
                            <Admin
                                adminItems={adminItems}
                            />
                            :
                            <div>
                                <p className="without-users">
                                    Nenhum usuário cadastrado.
                                </p>
                            </div>
                        }
                    </div>
                    :
                    <div>
                        <p className="without-users">
                            Em desenvolvimento!
                        </p>
                    </div>
                }
            </main>
        </div>
    )
}

export default Profile