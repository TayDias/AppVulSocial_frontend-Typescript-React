import React, { InputHTMLAttributes } from 'react'

import './styles.css'

interface PageNotificationProps extends InputHTMLAttributes<HTMLInputElement> {
    notificationItems: {
        id: number,
        protocol: string,
        status: number,
        preview: string,
        accessLink: string,
        vulnerable_id: number, 
        vulnerable_nickname: string,
        vulnerable_fullname: string
    }[],
    openChat: any
}

const Notification: React.FC<PageNotificationProps> = ( { notificationItems, openChat, ...rest}) => {
    return (
        <article className="notifications">
            {notificationItems.map((notificationItem) => {
                return (
                    <div key={Math.random()} className="notification">
                        <header>
                            <div>
                                <strong>{notificationItem.vulnerable_nickname} precisa de ajuda!</strong>
                            </div>
                        </header>

                        <p>{notificationItem.preview}</p>

                        <footer>
                            <button type="button" id="contact" onClick={openChat}>Entrar em contato</button>
                        </footer>
                    </div>
                )
            })}
        </article>
    )
}

export default Notification