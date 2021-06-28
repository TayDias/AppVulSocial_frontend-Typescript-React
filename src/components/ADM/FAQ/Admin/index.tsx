import React, { InputHTMLAttributes } from 'react'
import './styles.css'
import 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons'


interface PageAdminProps extends InputHTMLAttributes<HTMLInputElement> {
    FAQItems: {
        id: number,
        url: String,
        title: String,
        desc: String,
        text: String,
        location: String,
        action: number,
    }[]
    deleteFAQ: any,
    updateFAQ: any,
    insertFAQ: any
}

const Admin: React.FC<PageAdminProps> = ({ FAQItems, deleteFAQ, updateFAQ, insertFAQ, ...rest }) => {

    return (
        <div>
            <div className="grid-container-title">
                <div className="grid-item-title">
                    <p>ID</p>
                </div>
                <div className="grid-item-title">
                    <p>Título</p>
                </div>
                <div className="grid-item-title">
                    <p>Localização</p>
                </div>
                <div className="grid-item-title new-faq">
                    <FontAwesomeIcon onClick={() => insertFAQ()} icon={faPlusCircle} />
                </div>
            </div>
            <article>
                {FAQItems.map((FAQItem, index) => {
                    if (FAQItem.action !== 1) {
                        return (
                            <div key={Math.random()}>
                                <div className="grid-container">
                                    <div className="grid-item">
                                        {FAQItem.id}
                                    </div>
                                    <div className="grid-item">
                                        {FAQItem.title.replace(/<[^>]+>/g, '')}
                                    </div>
                                    <div className="grid-item">
                                        {FAQItem.location}
                                    </div>
                                    <div className="grid-item">
                                        <FontAwesomeIcon className="grid-item-button" onClick={() => updateFAQ(FAQItem.id)} icon={faPencilAlt} />
                                    </div>
                                    <div className="grid-item">
                                        <FontAwesomeIcon className="grid-item-button" onClick={() => deleteFAQ(FAQItem.id)} icon={faTimes} />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </article>
        </div>
    )
}

export default Admin