import React, { useState } from 'react'

import PageHeader from '../../components/PageHeader'
import Notification from '../../components/Notification'
import Schedule from '../../components/Schedule'

import './styles.css'

function Profile() {
    const [menuOption, setMenuOption] = useState("notification")
    const [agendaClassname, setAgendaClassname] = useState("off")
    const [notificationClassname, setNotificationClassname] = useState("on")

    //function loadUserInformation() {}
    //function loadSchedules() {}   
    //function loadNotifications() {}

    function changeMenuOption(id: string) {
        if(id === "agenda") {
            setMenuOption("agenda")
            setAgendaClassname("on")
            setNotificationClassname("off")
        }
        else {
            setMenuOption("notification")
            setAgendaClassname("off")
            setNotificationClassname("on")
        }
    }

    return (
        <div id="page-profile" className="container">
            <PageHeader 
                title='Olá Taynara, que bom que você está aqui agora!' 
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
                {/*<p className="without-notifications">Nenhuma notificação de solicitação de auxílio.</p>   */}
                { menuOption === "notification" ? 
                    <div>
                        <Notification 
                            title='Diego precisa de ajuda!'
                            preview='Preview.'
                        />
                        <Notification 
                            title='Maria precisa de ajuda!'
                            preview='Teste.'
                        />
                    </div> 
                    :
                    <div>
                        <Schedule 
                            from=""
                            to=""
                            weekday=""
                        /> 
                        <Schedule 
                            from=""
                            to=""
                            weekday=""
                        />
                    
                        <div className="agenda-buttons">
                            <div className="new-schedule">
                                <button type="button" >Incluir Novo</button>
                            </div>
                            <div className="save-schedules">
                                <button type="button" >Salvar Alterações</button>
                            </div>
                        </div> 
                    </div> 
                }
            </main>
        </div>
    )
}

export default Profile