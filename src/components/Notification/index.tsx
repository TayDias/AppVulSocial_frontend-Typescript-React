import React from 'react'

import './styles.css'

interface PageNotificationProps {
    title: string,
    preview?: string
}

const Notification: React.FC<PageNotificationProps> = props => {
    return (
        <article className="notification">
            <header>
                <div>
                    <strong>{props.title}</strong>
                </div>
            </header>

            <p>
                {props.preview}
            </p>

            <footer>
                <button type="button" id="contact">Entrar em contato</button>
            </footer>
        </article>
    )
}

export default Notification