import React, { InputHTMLAttributes } from 'react'
import './styles.css'
import 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'


interface PageAdminProps extends InputHTMLAttributes<HTMLInputElement> {
    adminItems: {
        id: number,
        name: String,
        type: String,
        avaliable: number,
        phone: String,
        email: String,
        bio: String,
        password: String,
    }[],
}

const Admin: React.FC<PageAdminProps> = ({ adminItems, ...rest }) => {
    return (
        <div>
            <div className="grid-container-title">
                <div className="grid-item-title">
                    <p>ID</p>
                </div>
                <div className="grid-item-title">
                    <p>Nome</p>
                </div>
                <div className="grid-item-title">
                    <p>Tipo</p>
                </div>
            </div>
            <article>
                {adminItems.map((adminItem, index) => {
                    return (
                        <div key={Math.random()}>
                            <div className="grid-container">
                                <div className="grid-item">
                                    {adminItem.id}
                                </div>
                                <div className="grid-item">
                                    {adminItem.bio}
                                </div>
                                <div className="grid-item">
                                    {adminItem.type}
                                </div>
                                <div className="grid-item">
                                    <FontAwesomeIcon className="grid-item-button" icon={faPencilAlt} />
                                </div>
                                <div className="grid-item">
                                    <FontAwesomeIcon className="grid-item-button" icon={faTimes} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </article>
        </div>
    )
}

export default Admin