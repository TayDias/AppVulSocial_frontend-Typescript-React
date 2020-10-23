import React, { FormEvent, useState, useEffect } from 'react'

import PageHeader from '../../components/PageHeader'
//import Notification from '../../components/Notification'
import Schedule from '../../components/Schedule'

import './styles.css'

import api from '../../services/api'

function Profile() {
    const rescuer_id = localStorage.getItem('rescuer_id')

    const [menuOption, setMenuOption] = useState("notification")
    const [agendaClassname, setAgendaClassname] = useState("off")
    const [notificationClassname, setNotificationClassname] = useState("on")

    const [scheduleItems, setScheduleItems] = useState([
        { id: 0, weekday: 'Domingo', from: '', to: '', toUpdate: true }
    ])

    const [userData, setUserData] = useState({
        name: "",
        type: "",
        email: "",
        bio: "",
        available: 1
    })

    useEffect(() => {
        loadUserInformation()
    }, [])

    /*
    function loadNotifications() {}
    */

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

        alert('Agenda atualizada com sucesso!')
    }

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            { id: 0, weekday: 'Domingo', from: '', to: '', toUpdate: false }
        ])
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

        setScheduleItems(propsItems)
    }

    async function loadSchedules() {
        const response = await api.get('schedules', {
            params: {
                rescuer_id,
            }
        })

        setScheduleItems(response.data)
        console.log(response.data)
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
            setMenuOption("notification")
            setAgendaClassname("off")
            setNotificationClassname("on")
        }
    }

    return (
        <div id="page-profile" className="container">
            <PageHeader 
                title={`Olá ${userData.name}, que bom que você está aqui agora!`}
                description="Você pode ver aqui quem está precisando de ajuda  e organizar sua agenda."
            />

            <form id="menu-items">
                <div className="input-block">
                    <button
                        type="button" 
                        id="notification" 
                        className={notificationClassname} 
                        onClick={() => changeMenuOption("notification")}
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
                {/*<div>
                        <Notification 
                            title='Diego precisa de ajuda!'
                            preview='Preview.'
                        />
                        <Notification 
                            title='Maria precisa de ajuda!'
                            preview='Teste.'
                        />
                    </div>
                */}
                { menuOption === "notification" ?
                    <p className="without-notifications">
                        Nenhuma notificação de solicitação de auxílio.
                    </p>    
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