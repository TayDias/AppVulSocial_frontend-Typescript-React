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

    function handleOpenBlipDesk() {
        window.open("https://desk.blip.ai")
    }

    function choseAlertData(option: string) {
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

    async function handleInsertUpdate(e: FormEvent) {
        e.preventDefault()

        const scheduleItemsToInsert = scheduleItems.filter(item => item.action === 1)
        const scheduleItemsToUpdate = scheduleItems.filter(item => item.action === 2)
        const scheduleItemsToDelete = scheduleItems.filter(item => item.action === 3 && item.id > 0)

        //let novoArrayA = scheduleItemsToDelete.map(item => item.id);

        //Insert new items
        if(scheduleItemsToInsert.length > 0){
            api.post('schedules', {
                rescuer_id,
                schedules: scheduleItemsToInsert
            }).catch(() => {
                alert('Erro na insersão de novos itens!')
            })
        }

        //Update items
        if(scheduleItemsToUpdate.length > 0){
            api.put('schedules', {
                rescuer_id,
                schedules: scheduleItemsToUpdate

            }).catch(() => {
                alert('Erro na alteração dos itens!')
            })
        }

        //Delete Items
        if(scheduleItemsToDelete.length > 0){
            scheduleItemsToDelete.map(item => {
                api.delete(
                    'schedules', { 
                        params: {
                            id: item.id
                        } 
                    }
                ).catch(() => {
                    alert('Erro na exclusão do item '+item.id)
                })
            });      
        }

        //Remover da lista itens com status 3 - exclusão
        let refreshItems = scheduleItems.filter(item => item.action !== 3)

        //Atualizar status para não haver insert duplicado
        refreshItems = refreshItems.map((scheduleItem:any) => {
            return {
                ...scheduleItem, 
                action: 0
            }
        })

        console.log(refreshItems)

        setScheduleItems(refreshItems)

        setChangeItems(false)
        alert('Agenda atualizada com sucesso!')
    }

    function removeScheduleItem(position:number, id:number){
        const refreshItems = scheduleItems.map((scheduleItem:any, index: number) => {
            if(scheduleItem.id === id) {
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

    function addNewScheduleItem(){
        setScheduleItems([
            { id: -1, weekday: '0', from: '00:00', to: '00:00', action: 1 },
            ...scheduleItems
        ])
        setChangeItems(true)
    }

    function setScheduleItemValue(position:number, field: string, value:string){
        const propsItems = scheduleItems.map((scheduleItem: any, index: number) => {
            //Item percorrido igual ao item de alteração
            if(index === position) {
                if(scheduleItem.action === 1) {
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
                        onClick={() => choseAlertData("discartChanges")}
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
            </form>

            <main>
                { menuOption === "notification" ? 
                    <div>
                        { notificationItems[0] ?
                            <Notification 
                                notificationItems={notificationItems}
                                openChat={handleOpenBlipDesk}
                            />
                            :
                            <div>
                                <p className="without-notifications">
                                    Nenhuma notificação de solicitação de auxílio.
                                </p>             
                            </div>
                        }

                        <div className="open-blip-desk">
                            <button type="button" onClick={handleOpenBlipDesk}>Acessar o BLIP DESK</button>
                        </div>

                    </div>
                    :
                    <form onSubmit={handleInsertUpdate}> 
                        <div className="agenda-buttons">
                            <div className="new-schedule">
                                <button type="button" onClick={addNewScheduleItem}>Incluir Novo</button>
                            </div>

                            { scheduleItems[0] ?
                                <div className="save-schedules">
                                    <button type="submit" >Salvar Alterações</button>
                                </div>
                            : null
                            }
                        </div>

                        { !scheduleItems[0] ?
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
                }
            </main>
        </div>
    )
}

export default Profile