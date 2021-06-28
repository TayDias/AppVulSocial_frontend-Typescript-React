import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import PageHeader from '../../components/PageHeader'
import Admin from '../../components/ADM/Users/Admin'
import AdminUpdateUser from '../../components/ADM/Users/AdminUpdateUser'
import AdminFAQ from '../../components/ADM/FAQ/Admin'
import AdminUpdateFAQ from '../../components/ADM/FAQ/AdminUpdateFAQ'
import AlertDialog from '../../components/AlertDialog'
import StyledInput from '../../components/StyledInput'
import StyledTextArea from '../../components/StyledTextArea'
import StyledSelect from '../../components/StyledSelect'

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
    const [faqClassname, setFAQClassname] = useState("off")

    const [adminItems, setAdminItems] = useState([{
        id: 0,
        name: "",
        type: "",
        available: 1,
        phone: "",
        email: "",
        bio: "",
        password: "",
        action: 0
    }])

    const [FAQItems, setFAQItems] = useState([{
        id: 0,
        url: "",
        title: "",
        desc: "",
        text: "",
        location: "",
        action: 0
    }])

    const [updateFAQItems, setUpdateFAQItems] = useState([{
        id: 0,
        url: "",
        title: "",
        desc: "",
        text: "",
        location: "",
    }])

    const [updateUserItems, setUpdateUserItems] = useState([{
        id: 0,
        name: "",
        available: 1,
        phone: "",
        email: "",
        bio: "",
        password: ""
    }])

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
        if (option === "success") {
            changeAlertData({
                title: "Usuário Atualizado!",
                descripton: "O usuário foi atualizado com sucesso.",
                optionOne: "",
                optionTwo: "",
                type: "visualize"
            })
        }

        if (option === "successFAQ") {
            changeAlertData({
                title: "Pergunta Frequente Atualizada!",
                descripton: "A pergunta frequente foi atualizada com sucesso.",
                optionOne: "",
                optionTwo: "",
                type: "visualize"
            })
        }

        if (option === "password") {
            changeAlertData({
                title: "Atenção!",
                descripton: "As senhas não coincidem.",
                optionOne: "",
                optionTwo: "",
                type: "visualize"
            })
        }

        if (option === "incomplete") {
            changeAlertData({
                title: "Atenção!",
                descripton: "Preencha todos os campos. Os campos de senha não são obrigatórios!",
                optionOne: "",
                optionTwo: "",
                type: "visualize"
            })
        }

        if (option === "incompleteFAQ") {
            changeAlertData({
                title: "Atenção!",
                descripton: "Preencha todos os campos. O campo de Descrição e URL não são obrigatórios!",
                optionOne: "",
                optionTwo: "",
                type: "visualize"
            })
        }

        if (option === "logout") {
            changeAlertData({
                title: "Atenção!",
                descripton: "Deseja mesmo encerrar sua sessão?",
                optionOne: "Permanecer",
                optionTwo: "Encerrar Agora",
                type: "choose"
            })

            changeAlertOnAcceptFunction(() => handleAcceptedLogout)
        } else if (option === "deleteuser") {
            changeAlertData({
                title: "Atenção!",
                descripton: "Deseja mesmo excluir este usuário?",
                optionOne: "Cancelar",
                optionTwo: "Excluir",
                type: "choose"
            })

            changeAlertOnAcceptDeleteFunction(() => handleAcceptedDelete)
        } else if (option === "deletefaq") {
            changeAlertData({
                title: "Atenção!",
                descripton: "Deseja mesmo excluir esta pergunta frequente?",
                optionOne: "Cancelar",
                optionTwo: "Excluir",
                type: "choose"
            })

            changeAlertOnAcceptDeleteFunctionFAQ(() => handleAcceptedDeleteFAQ)
        }
    }

    // Variaveis de controle da msg de alerta
    const [alertDialogIsOpen, changeAlertDialogStatus] = useState(false)
    const [alertOnAcceptFunction, changeAlertOnAcceptFunction] = useState(() => handleAcceptedLogout)

    const [alertDialogDeleteIsOpen, changeAlertDialogDeleteStatus] = useState(false)
    const [alertOnAcceptDeleteFunction, changeAlertOnAcceptDeleteFunction] = useState(() => handleAcceptedDelete)

    const [alertDialogDeleteIsOpenFAQ, changeAlertDialogDeleteStatusFAQ] = useState(false)
    const [alertOnAcceptDeleteFunctionFAQ, changeAlertOnAcceptDeleteFunctionFAQ] = useState(() => handleAcceptedDeleteFAQ)


    // FUNÇOES EXCLUSIVAS DE CONTROLE DA INTERFACE //
    function changeMenuOption(id: string) {
        if (id === "usuarios") {
            if (rescuer_id != null) {
                loadAdmin();
            }
            setMenuOption("usuarios")
            setUsuariosClassname("on")
            setAtendimentosClassname("off")
            setFAQClassname("off")
        }
        if (id === "atendimento") {
            setMenuOption("atendimento")
            setAtendimentosClassname("on")
            setUsuariosClassname("off")
            setFAQClassname("off")
        }
        if (id === "updateUser") {
            setMenuOption("updateUser")
            setUsuariosClassname("on")
            setAtendimentosClassname("off")
            setFAQClassname("off")
        }
        if (id === "faq") {
            setMenuOption("faq")
            setUsuariosClassname("off")
            setAtendimentosClassname("off")
            setFAQClassname("on")
        }
        if (id === "updatefaq") {
            setMenuOption("updatefaq")
            setUsuariosClassname("off")
            setAtendimentosClassname("off")
            setFAQClassname("on")
        }
    }

    async function handleExitEdit() {
        changeMenuOption("usuarios")
    }

    async function handleExitEditFAQ() {
        changeMenuOption("faq")
    }

    async function handleLogout() {
        choseAlertData("logout")
        handleOpenAlert()
    }

    async function handleAcceptedLogout() {
        logout()
        history.push('/')
    }

    async function handleDelete() {
        choseAlertData("deleteuser");
        handleOpenDeleteAlert();
    }

    async function handleDeleteFAQ() {
        choseAlertData("deletefaq");
        handleOpenDeleteAlertFAQ();
    }

    async function handleAcceptedDelete() {
        const id = localStorage.getItem("deleteID");
        if (id != null) {
            const refreshItems = adminItems.map((adminItem: any) => {
                if (adminItem.id === parseInt(id)) {
                    return {
                        ...adminItem,
                        action: 1
                    }
                }
                return adminItem
            })

            api.delete(
                'admin', {
                params: {
                    id: id
                }
            }
            ).catch(() => {
                console.log('Erro na exclusão do item ' + id)
            })
            setAdminItems(refreshItems)

            setTimeout(() => {
                loadAdmin();
                setMenuOption("usuarios")
                setUsuariosClassname("on")
                setAtendimentosClassname("off")
            }, 1000);
        }
    }

    async function handleAcceptedDeleteFAQ() {
        const id = localStorage.getItem("deleteFAQID");
        if (id != null) {
            const refreshItems = FAQItems.map((FAQItem: any) => {
                if (FAQItem.id === parseInt(id)) {
                    return {
                        ...FAQItem,
                        action: 1
                    }
                }
                return FAQItem
            })

            api.delete(
                'adminfaqdel', {
                params: {
                    id: id
                }
            }
            ).catch(() => {
                console.log('Erro na exclusão do item ' + id)
            })
            setFAQItems(refreshItems)

            setTimeout(() => {
                loadAdmin();
                setMenuOption("faq")
                setFAQClassname("on")
                setAtendimentosClassname("off")
            }, 1000);
        }
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

    async function handleOpenDeleteAlert() {
        changeAlertDialogDeleteStatus(true)
    }

    async function handleCloseDeleteAlert() {
        changeAlertDialogDeleteStatus(false)
    }

    async function handleOpenDeleteAlertFAQ() {
        changeAlertDialogDeleteStatusFAQ(true)
    }

    async function handleCloseDeleteAlertFAQ() {
        changeAlertDialogDeleteStatusFAQ(false)
    }

    // FUNÇOES DE OPERAÇÕES EM BANCO DE DADOS - CRUD //
    useEffect(() => {
        if (rescuer_id && rescuer_type === "Admin") {
            loadUserInformation()
            loadFAQ();
            loadAdmin();
        }
        else if (rescuer_id === null) {
            history.push('/login')
        }
        else if (rescuer_type != "Admin") {
            history.push('/login')
        }

    }, [history, rescuer_id])

    async function loadAdmin() {
        const response = await api.get(`adminuser/${rescuer_id}`)

        setAdminItems(response.data)
    }

    async function loadFAQ() {
        const response = await api.get(`adminfaq`)

        setFAQItems(response.data)
    }

    async function loadUserInformation() {
        let id = rescuer_id
        const response = await api.get(`rescuers/${id}`)

        setUserData(response.data)
    }

    function deleteFAQItem(id: number) {
        localStorage.setItem('deleteFAQID', `${id}`);
        handleDeleteFAQ();
    }

    async function updateFAQItem(id: number) {
        const response = await api.get(`adminfaqupdate/${id}`)

        setUpdateFAQItems(response.data)

        await changeMenuOption("updatefaq")
    }

    function deleteUserItem(id: number) {
        localStorage.setItem('deleteID', `${id}`);
        handleDelete();
    }

    async function updateUserItem(id: number) {
        const response = await api.get(`adminupdate/${id}`)

        setUpdateUserItems(response.data)

        await changeMenuOption("updateUser")
    }

    async function alterUserSuccess(id: number, name: string, available: number, phone: string, email: string, bio: string, password: string) {
        changeMenuOption("usuarios")
        const refreshUserItems = updateUserItems.map((updateUserItem) => {
            return {
                id: id,
                name: name,
                available: available,
                phone: phone,
                email: email,
                bio: bio,
                password: password,
            }
        });
        setUpdateUserItems(refreshUserItems);

        await api.put('adminupdateuser', {
            id,
            name,
            available,
            phone,
            email,
            bio,
            password,
        }).catch(() => {
            console.log('Erro na alteração!')
        })
    }

    function alterUserError(option: String) {

        choseAlertData(`${option}`)
        handleOpenAlert()
    }

    function alterFAQSuccess(id: number, url: string, title: string, desc: string, text: string, location: string) {
        changeMenuOption("faq")
        const refreshFAQItems = updateFAQItems.map((updateFAQItem) => {
            return {
                id: id,
                url: url,
                title: title,
                desc: desc,
                text: text,
                location: location,
            }
        });
        setUpdateFAQItems(refreshFAQItems);

        choseAlertData('successFAQ')
        handleOpenAlert()
    }

    function alterFAQError(option: String) {

        choseAlertData(`${option}`)
        handleOpenAlert()
    }

    return (
        <div id="page-profile" className="container">
            <AlertDialog
                alertProps={alertData}
                isOpen={alertDialogIsOpen}
                onAccept={alertOnAcceptFunction}
                onClose={handleCloseAlert}
            />

            <AlertDialog
                alertProps={alertData}
                isOpen={alertDialogDeleteIsOpen}
                onAccept={alertOnAcceptDeleteFunction}
                onClose={handleCloseDeleteAlert}
            />

            <AlertDialog
                alertProps={alertData}
                isOpen={alertDialogDeleteIsOpenFAQ}
                onAccept={alertOnAcceptDeleteFunctionFAQ}
                onClose={handleCloseDeleteAlertFAQ}
            />

            <PageHeader
                title={`Olá ${userData.name}, que bom que você está aqui agora!`}
                description="Aqui você pode gerenciar os usuários do sistema."
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
                <div className="input-block">
                    <button
                        type="button"
                        id="atendimento"
                        className={faqClassname}
                        onClick={() => changeMenuOption("faq")}
                    >
                        Gerenciar FAQ
                    </button>
                </div>
            </form>

            <main>
                {menuOption === "usuarios" &&
                    <div>
                        {adminItems[0] ?
                            <Admin
                                adminItems={adminItems}
                                deleteUser={deleteUserItem}
                                updateUser={updateUserItem}
                            />
                            :
                            <div>
                                <p className="without-users">
                                    Nenhum usuário cadastrado.
                                </p>
                            </div>
                        }
                    </div>
                }
                {menuOption === "atendimento" &&
                    <div>
                        <p className="without-users">
                            Em desenvolvimento!
                        </p>
                    </div>
                }
                {menuOption === "faq" &&
                    <div>
                        {FAQItems[0] ?
                            <AdminFAQ
                                FAQItems={FAQItems}
                                deleteFAQ={deleteFAQItem}
                                updateFAQ={updateFAQItem}
                            />
                            :
                            <div>
                                <p className="without-users">
                                    Nenhum usuário cadastrado.
                                </p>
                            </div>
                        }
                    </div>
                }
                {menuOption === "updateUser" &&
                    <div>
                        {updateUserItems[0] ?
                            <div>
                                <AdminUpdateUser
                                    updateUserItems={updateUserItems}
                                    alterUserSuccess={alterUserSuccess}
                                    alterUserError={alterUserError}
                                    editExit={handleExitEdit}
                                />
                            </div>
                            :
                            <div>
                                <p className="without-users">
                                    Nenhum usuário encontrado.
                                </p>
                            </div>
                        }
                    </div>
                }
                {menuOption === "updatefaq" &&
                    <div>
                        {updateFAQItems[0] ?
                            <div>
                                <AdminUpdateFAQ
                                    updateFAQItems={updateFAQItems}
                                    alterFAQSuccess={alterFAQSuccess}
                                    alterFAQError={alterFAQError}
                                    editExit={handleExitEditFAQ}
                                />
                            </div>
                            :
                            <div>
                                <p className="without-users">
                                    Nenhuma pergunta frequente cadastrada.
                                </p>
                            </div>
                        }
                    </div>
                }
            </main>
        </div>
    )
}

export default Profile