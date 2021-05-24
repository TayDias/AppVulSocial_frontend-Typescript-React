import React, { FormEvent, InputHTMLAttributes } from 'react'

import PageHeader from '../../components/PageHeader'
import StyledInput from '../../components/StyledInput'
import StyledTextArea from '../../components/StyledTextArea'
import StyledSelect from '../../components/StyledSelect'
import AlertDialog from '../../components/AlertDialog'
import uuidv4 from '../../utils/generateUuidv4'
import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'

interface PageAdminUpdateUserProps extends InputHTMLAttributes<HTMLInputElement> {
    updateUserItems: {
        id: number,
        name: String,
        type: String,
        available: number,
        phone: String,
        email: String,
        bio: String,
        password: String
    }[],
    editExit: any
}

const AdminUpdateUser: React.FC<PageAdminUpdateUserProps> = ({ updateUserItems, editExit, ...rest }) => {
    return (
        <div className="update">
            <main>
                <div className="update-top">Edição do registro {updateUserItems[0].id}</div>
                <form className="update-form" /*onSubmit={handleUpdate}*/>
                    <StyledSelect
                        name="status"
                        label="Status"
                        defaultValue={updateUserItems[0].available}
                        //onChange={(e) => { (e.target.value) }}
                        options={[
                            { id: '0', value: '0', label: 'Desabilitado' },
                            { id: '1', value: '1', label: 'Habilitado' }
                        ]}
                    />

                    <StyledInput
                        name="name"
                        label="Nome Completo"
                        defaultValue={`${updateUserItems[0].name}`}
                    //onChange={(e) => { (e.target.value) }}
                    />

                    <StyledInput
                        name="phone"
                        label="Telefone"
                        defaultValue={`${updateUserItems[0].phone}`}
                    //onChange={(e) => { (e.target.value) }}
                    />

                    <StyledInput
                        name="email"
                        label="E-mail"
                        type="email"
                        defaultValue={`${updateUserItems[0].email}`}
                    //onChange={(e) => { (e.target.value) }}
                    />

                    <StyledTextArea
                        name="bio"
                        label="Biografia"
                        defaultValue={`${updateUserItems[0].bio}`}
                    //onChange={(e) => { (e.target.value) }}
                    />

                    <div className="grid-container-pass">
                        <div className="credentials">
                            <StyledInput
                                name="password"
                                label="Trocar Senha"
                                type="password"
                            //onChange={(e) => { (e.target.value) }}
                            />
                        </div>
                        <div className="grid-item-pass">
                            <StyledInput
                                name="confirmpassword"
                                label="Confirmação da Senha"
                                type="password"
                            //onChange={(e) => { (e.target.value) }}
                            />
                        </div>
                    </div>

                    <footer className="resize-footer">
                        <button className="back" type="button" onClick={() => editExit()}>
                            Voltar sem salvar
                        </button>
                        <button type="submit">
                            Salvar alterações
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default AdminUpdateUser