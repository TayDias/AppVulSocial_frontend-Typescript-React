import React, { FormEvent, useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import PageHeader from '../../components/PageHeader'
import Notification from '../../components/Notification'
import Schedule from '../../components/Schedule'
import AlertDialog from '../../components/AlertDialog'

import './styles.css'

import api from '../../services/api'
import { logout } from '../../services/auth'

function Profile() {
    const history = useHistory()
    const rescuer_id = localStorage.getItem('rescuer_id')

    const [menuOption, setMenuOption] = useState("notification")
    const [agendaClassname, setAgendaClassname] = useState("off")
    const [notificationClassname, setNotificationClassname] = useState("on")

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

    const [scheduleItems, setScheduleItems] = useState([
        { id: 0, weekday: 'Domingo', from: '', to: '', toUpdate: true }
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
    const [alertData, changeAlertData]  = useState({
        title: "Atenção!",
        descripton: "Deseja mesmo encerrar sua sessão?",
        optionOne: "Permanecer",
        optionTwo: "Encerrar Agora"
    })

    const [alertDialogIsOpen, changeAlertDialogStatus ] = useState(false)
    const [alertOnAcceptFunction, changeAlertOnAcceptFunction] = useState(() => handleLogout)

    useEffect(() => {
        if(rescuer_id) {
            loadUserInformation()
            loadNotifications()
        }
        else {
            alert("É necessário fazer o login para acessar seu perfil.")
            history.push('/login')
        }
    }, [])

    async function handleOpenAlert() {
        changeAlertDialogStatus(true)
    }
    
    async function handleCloseAlert () {
        changeAlertDialogStatus(false)

        // Volta para a defaut - É gambiarra mesmo :P
        changeAlertData({
            title: "Atenção!",
            descripton: "Deseja mesmo encerrar sua sessão?",
            optionOne: "Permanecer",
            optionTwo: "Encerrar Agora"
        })
        changeAlertOnAcceptFunction(() => handleLogout)
    }

    async function handleContinueAction() {
        changeMenuOption("notification")
        setChangeItems(false)
    }

    // Defaut alert function
    async function handleLogout() {
        logout()
        history.push('/')
    }

    function handleOpenChat() {
        history.push('/chat')
    }

    function choseAlertDataAndFunction(option: string) {
        if(changeItems) {
            if(option === "discartChanges") {
                changeAlertData({
                    title: "Atenção!",
                    descripton: "Notei que você não salvou as alterações feitas na agenda, deseja mesmo descarta-las?",
                    optionOne: "Permanecer na agenda",
                    optionTwo: "Descartar alterações"
                })
                changeAlertOnAcceptFunction(() => handleContinueAction)
            }

            handleOpenAlert()
        }
        else {
            handleContinueAction()
        }
    }

    function handleInsertUpdate(e: FormEvent) {
        e.preventDefault()

        const scheduleItemsToInsert = scheduleItems.filter(item => !item.toUpdate)
        const scheduleItemsToUpdate = scheduleItems.filter(item => item.toUpdate)

        //Insert new items
        api.post('schedules', {
            rescuer_id,
            schedules: scheduleItemsToInsert
        }).catch(() => {
            alert('Erro na insersão de novos itens!')
        })

        //Update items
        api.put('schedules', {
            rescuer_id,
            schedules: scheduleItemsToUpdate

        }).catch(() => {
            alert('Erro na alteração dos itens!')
        })

        setChangeItems(false)
        alert('Agenda atualizada com sucesso!')
    }

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            { id: 0, weekday: 'Domingo', from: '', to: '', toUpdate: false }
        ])
        setChangeItems(true)
    }

    function setScheduleItemValue(position:number, field: string, value:string){
        const propsItems = scheduleItems.map((scheduleItem: any, index: number) => {
            //Item percorrido igual ao item de alteração
            if(index === position) {
                return {
                    ...scheduleItem,
                    [field]: value  //sobrescreve o item com o novo valor
                }
            }
            
            return scheduleItem
        })

        setChangeItems(true)
        setScheduleItems(propsItems)
    }

    async function loadNotifications() {
        const response = await api.get('assistance')

        setNotificationItems(response.data)
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

    function changeMenuOption(id: string) {
        if(id === "agenda") {
            loadSchedules()
            setMenuOption("agenda")
            setAgendaClassname("on")
            setNotificationClassname("off")         
        }
        else if (id === "notification") {
            loadNotifications()
            setMenuOption("notification")
            setAgendaClassname("off")
            setNotificationClassname("on")
        }
    }

    return (
        <div id="page-profile" className="container">
            <AlertDialog 
                alertProps = {alertData}
                isOpen = {alertDialogIsOpen}
                onAccept= {alertOnAcceptFunction}
                onClose= {handleCloseAlert}
            />

            <PageHeader 
                title={`Olá ${userData.name}, que bom que você está aqui agora!`}
                description="Você pode ver aqui quem está precisando de ajuda  e organizar sua agenda."
                logout={handleOpenAlert}
            />

            <form id="menu-items">
                <div className="input-block">
                    <button
                        type="button" 
                        id="notification" 
                        className={notificationClassname} 
                        onClick={() => choseAlertDataAndFunction("discartChanges")}
                    >
                        Notificações
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
            </form>

            <main>
                { menuOption === "notification" ? 
                    <div>
                        { notificationItems[0] ?
                            <Notification 
                                notificationItems={notificationItems}
                                openChat={handleOpenChat}
                            />
                            :
                            <div>
                                <p className="without-notifications">
                                    Nenhuma notificação de solicitação de auxílio.
                                </p>             
                            </div>
                        }
                    </div>
                    :
                    <form onSubmit={handleInsertUpdate}>
                        <Schedule 
                            scheduleItems={scheduleItems}
                            alterSchedule={setScheduleItemValue}
                        />
                    
                        <div className="agenda-buttons">
                            <div className="new-schedule">
                                <button type="button" onClick={addNewScheduleItem}>Incluir Novo</button>
                            </div>
                            <div className="save-schedules">
                                <button type="submit" >Salvar Alterações</button>
                            </div>
                        </div> 
                    </form> 
                }
            </main>
        </div>
    )
}

export default Profile