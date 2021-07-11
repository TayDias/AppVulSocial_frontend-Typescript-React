import { FormEvent, useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import PageHeader from '../../components/PageHeader'
import Help from '../../components/FAQ'
import HelpDesk from '../../components/FAQDesk'
import Schedule from '../../components/Schedule'
import AlertDialog from '../../components/AlertDialog'

import './styles.css'

import api from '../../services/api'
import { logout } from '../../services/auth'

function Profile() {
    const history = useHistory()
    const rescuer_id = localStorage.getItem('rescuer_id')
    const rescuer_type = localStorage.getItem('rescuer_type')

    const [menuOption, setMenuOption] = useState("notification")
    const [agendaClassname, setAgendaClassname] = useState("off")
    const [notificationClassname, setNotificationClassname] = useState("on")
    const [helpClassname, setHelpClassname] = useState("off")

    const [notificationItems, setNotificationItems] = useState([{
        id: 0,
        protocol: 'none',
        status: 0,
        preview: '',
        accessLink: '',
        vulnerable_id: 0,
        vulnerable_nickname: '',
        vulnerable_fullname: ''
    }])

    const [helpItems, setHelpItems] = useState([{
        id: 0,
        url: '',
        title: '',
        desc: '',
        text: '',
        location: ''
    }])

    const [helpdeskItems, setHelpDeskItems] = useState([{
        id: 0,
        url: '',
        title: '',
        desc: '',
        text: '',
        location: ''
    }])

    const [scheduleItems, setScheduleItems] = useState([
        { id: -1, weekday: 'Domingo', from: '', to: '', action: 0 }
    ])

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

    // Variaveis de controle da msg de alerta
    const [alertDialogIsOpen, changeAlertDialogStatus] = useState(false)
    const [alertOnAcceptFunction, changeAlertOnAcceptFunction] = useState(() => handleAcceptedLogout)


    // FUNÇOES EXCLUSIVAS DE CONTROLE DA INTERFACE //
    function changeMenuOption(id: string) {
        if (id === "agenda") {
            loadSchedules()
            setMenuOption("agenda")
            setAgendaClassname("on")
            setHelpClassname("off")
            setNotificationClassname("off")
        }
        if (id === "notification") {
            loadNotifications()
            loadHelp("Desk")
            setMenuOption("notification")
            setAgendaClassname("off")
            setHelpClassname("off")
            setNotificationClassname("on")
        }
        if (id === "help") {
            loadHelp("FAQ")
            setMenuOption("help")
            setAgendaClassname("off")
            setHelpClassname("on")
            setNotificationClassname("off")
        }
    }

    async function handleContinueActionDesk() {
        changeMenuOption("notification")
        setChangeItems(false)
    }

    async function handleContinueActionHelp() {
        changeMenuOption("help")
        setChangeItems(false)
    }

    async function handleLogout() {
        choseAlertData("logout")
        handleOpenAlert()
    }

    async function handleAcceptedLogout() {
        logout()
        history.push('/')
    }

    function handleOpenBlipDesk() {
        window.open("https://desk.blip.ai")
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

    function handleFirstAccessMessage() {
        const addBlip = localStorage.getItem('addBlip')
        const primeiroAcesso = localStorage.getItem('primeiroAcesso')

        if (addBlip?.toString().match("sim") && primeiroAcesso?.toString().match(userData.email)) {
            choseAlertData("firstAccess")
            handleOpenAlert()
        }

        localStorage.removeItem('addBlip')
        localStorage.removeItem('primeiroAcesso')
    }

    function choseAlertData(option: string) {
        if (option === "discartChangesDesk") {
            if (changeItems) {
                changeAlertData({
                    title: "Atenção!",
                    descripton: "Notei que você não salvou as alterações feitas na agenda, deseja mesmo descarta-las?",
                    optionOne: "Permanecer na agenda",
                    optionTwo: "Descartar alterações",
                    type: "choose"
                })

                changeAlertOnAcceptFunction(() => handleContinueActionDesk)
                handleOpenAlert()
            }
            else {
                handleContinueActionDesk()
            }

        }

        if (option === "discartChangesHelp") {
            if (changeItems) {
                changeAlertData({
                    title: "Atenção!",
                    descripton: "Notei que você não salvou as alterações feitas na agenda, deseja mesmo descarta-las?",
                    optionOne: "Permanecer na agenda",
                    optionTwo: "Descartar alterações",
                    type: "choose"
                })

                changeAlertOnAcceptFunction(() => handleContinueActionHelp)
                handleOpenAlert()
            }
            else {
                handleContinueActionHelp()
            }

        }
        else if (option === "firstAccess") {
            changeAlertData({
                title: "Bem vindo(a)!",
                descripton: "Olá :-) Notei que esse é o seu primeiro acesso ao seu perfil. " +
                    "Para atender os que buscam ajuda você precisa ter um cadastro na plataforma Blip Desk. " +
                    "Por isso, caso não tenha, enviei um link de conclusão de cadastro para o seu e-mail. " +
                    "Após se cadastrar lá, você pode sempre ir direto para o local de atendimento por aqui, " +
                    "no botão 'Acessar o Blip Desk'. Está Ok? ;-)",
                optionOne: "Ok!",
                optionTwo: '',
                type: "confirm"
            })

            //Sem função de ação
        }
        else if (option === "logout") {
            changeAlertData({
                title: "Atenção!",
                descripton: "Deseja mesmo encerrar sua sessão?",
                optionOne: "Permanecer",
                optionTwo: "Encerrar Agora",
                type: "choose"
            })

            changeAlertOnAcceptFunction(() => handleAcceptedLogout)
        }

        else if (option === "registered") {
            changeAlertData({
                title: "Sucesso",
                descripton: "Agenda atualizada com sucesso!",
                optionOne: "",
                optionTwo: "",
                type: "visualize"
            })

            //Sem função de ação
        }
    }

    // FUNÇOES DE OPERAÇÕES EM BANCO DE DADOS - CRUD //
    useEffect(() => {
        if (rescuer_id && rescuer_type !== "Admin") {
            loadUserInformation()
            loadNotifications()
            loadHelp("Desk")
            handleFirstAccessMessage()
        }
        else if (rescuer_id === null && rescuer_type !== "Admin") {
            history.push('/login')
        }
        else if (rescuer_id && rescuer_type === "Admin") {
            history.push('/login')
        }

    }, [history, rescuer_id])

    async function handleInsertUpdate(e: FormEvent) {
        e.preventDefault()

        const scheduleItemsToInsert = scheduleItems.filter(item => item.action === 1)
        const scheduleItemsToUpdate = scheduleItems.filter(item => item.action === 2)
        const scheduleItemsToDelete = scheduleItems.filter(item => item.action === 3 && item.id > 0)

        //Insert new items
        if (scheduleItemsToInsert.length > 0) {
            api.post('schedules', {
                rescuer_id,
                schedules: scheduleItemsToInsert
            }).catch(() => {
                console.log('Erro na insersão de novos itens!')
            })
        }

        //Update items
        if (scheduleItemsToUpdate.length > 0) {
            api.put('schedules', {
                rescuer_id,
                schedules: scheduleItemsToUpdate

            }).catch(() => {
                console.log('Erro na alteração dos itens!')
            })
        }

        //Delete Items
        if (scheduleItemsToDelete.length > 0) {
            scheduleItemsToDelete.map(item => {
                api.delete(
                    'schedules', {
                    params: {
                        id: item.id
                    }
                }
                ).catch(() => {
                    console.log('Erro na exclusão do item ' + item.id)
                })
            });
        }

        //Remover da lista itens com status 3 - exclusão
        let refreshItems = scheduleItems.filter(item => item.action !== 3)

        //Atualizar status para não haver insert duplicado
        refreshItems = refreshItems.map((scheduleItem: any) => {
            return {
                ...scheduleItem,
                action: 0
            }
        })

        setScheduleItems(refreshItems)
        setChangeItems(false)

        choseAlertData("registered")
        handleOpenAlert()
    }

    async function loadNotifications() {
        const response = await api.get('assistance')

        setNotificationItems(response.data)
    }

    async function loadHelp(location: String) {
        const response = await api.get('help', {
            params: {
                location,
            }
        })

        setHelpItems(response.data)
    }

    async function loadSchedules() {
        const response = await api.get('schedules', {
            params: {
                rescuer_id,
            }
        })

        setScheduleItems(response.data)
    }

    async function loadUserInformation() {
        let id = rescuer_id
        const response = await api.get(`rescuers/${id}`)

        setUserData(response.data)
    }

    // FUNÇOES DE CONTROLE DE DADOS NA INTERFACE //
    function removeScheduleItem(position: number, id: number) {
        const refreshItems = scheduleItems.map((scheduleItem: any, index: number) => {
            if (scheduleItem.id === id) {
                return {
                    ...scheduleItem,
                    action: 3
                }
            }
            return scheduleItem
        })

        setChangeItems(true)
        setScheduleItems(refreshItems)
    }

    function addNewScheduleItem() {
        setScheduleItems([
            { id: -1, weekday: '0', from: '00:00', to: '00:00', action: 1 },
            ...scheduleItems
        ])
        setChangeItems(true)
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const propsItems = scheduleItems.map((scheduleItem: any, index: number) => {
            //Item percorrido igual ao item de alteração
            if (index === position) {
                if (scheduleItem.action === 1) {
                    return {
                        ...scheduleItem,
                        [field]: value //sobrescreve o item com o novo valor
                    }
                }
                else {
                    return {
                        ...scheduleItem,
                        [field]: value, //sobrescreve o item com o novo valor
                        action: 2
                    }
                }
            }

            return scheduleItem
        })

        setChangeItems(true)
        setScheduleItems(propsItems)
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
                        id="notification"
                        className={notificationClassname}
                        onClick={() => choseAlertData("discartChangesDesk")}
                    >
                        Desk
                    </button>
                </div>
                <div className="input-block">
                    <button
                        type="button"
                        id="agenda"
                        className={agendaClassname}
                        onClick={() => changeMenuOption("agenda")}
                    >
                        Agenda
                    </button>
                </div>
                <div className="input-block">
                    <button
                        type="button"
                        id="help"
                        className={helpClassname}
                        onClick={() => choseAlertData("discartChangesHelp")}
                    >
                        Perguntas Frequentes
                    </button>
                </div>
            </form>

            <main>
                {menuOption === "notification" ?
                    <div>
                        <div>
                            {helpItems[0] ?
                                <HelpDesk
                                    helpItems={helpItems}
                                />
                                :
                                <span></span>
                            }
                        </div>
                        <div className="open-blip-desk">
                            <button type="button" onClick={handleOpenBlipDesk}>Acessar o BLIP DESK</button>
                        </div>

                    </div>
                    :
                    menuOption === "agenda" ?
                        <form onSubmit={handleInsertUpdate}>
                            <div className="agenda-buttons">
                                <div className="new-schedule">
                                    <button type="button" onClick={addNewScheduleItem}>Incluir Novo</button>
                                </div>

                                {scheduleItems[0] ?
                                    <div className="save-schedules">
                                        <button type="submit" >Salvar Alterações</button>
                                    </div>
                                    : null
                                }
                            </div>

                            {!scheduleItems[0] ?
                                <div>
                                    <p className="without-schedules">
                                        Nenhum horário de atendimento cadastrado.
                                </p>
                                </div>
                                : null
                            }

                            <Schedule
                                scheduleItems={scheduleItems}
                                alterSchedule={setScheduleItemValue}
                                removeSchedule={removeScheduleItem}
                            />
                        </form>
                        :
                        <div>
                            {helpItems[0] ?
                                <div>
                                    <Help
                                        helpItems={helpItems}
                                    />
                                </div>
                                :
                                <div>
                                    <p className="without-help">
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