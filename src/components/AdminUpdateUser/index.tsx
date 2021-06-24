//https://zenoamaro.github.io/react-quill/

import React, { FormEvent, InputHTMLAttributes, useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import PageHeader from '../../components/PageHeader';
import StyledInput from '../../components/StyledInput';
import StyledTextArea from '../../components/StyledTextArea';
import StyledSelect from '../../components/StyledSelect';
import AlertDialog from '../../components/AlertDialog';
import uuidv4 from '../../utils/generateUuidv4';
import warningIcon from '../../assets/images/icons/warning.svg';

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
    alterUserSuccess: any,
    alterUserError: any,
    editExit: any
}

const AdminUpdateUser: React.FC<PageAdminUpdateUserProps> = ({ alterUserSuccess, alterUserError, updateUserItems, editExit, ...rest }) => {
    const history = useHistory();
    
    const [Name, setName] = useState(updateUserItems[0].name);
    const [Available, setAvailable] = useState(updateUserItems[0].available);
    const [Phone, setPhone] = useState(updateUserItems[0].phone);
    const [Email, setEmail] = useState(updateUserItems[0].email);
    const [Bio, setBio] = useState(updateUserItems[0].bio);
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    async function handleUpdate(e: FormEvent) {
        e.preventDefault();

        let Successful = false
        if (Name.length === 0 || Phone.length === 0 || Email.length === 0 || Bio.length === 0) {
            alterUserError('incomplete');
        } else {
            if (Password.toString() === ConfirmPassword.toString()) {
                Successful = true;
            } else {
                alterUserError('password');
            }
        }

        if (Successful === true) {
            alterUserSuccess(updateUserItems[0].id, Name, updateUserItems[0].type, Available, Phone, Email, Bio, Password);
        }
    }

    return (
        <div className="update">
            <main>
                <div className="update-top">Edição do registro {updateUserItems[0].id}</div>
                <form onSubmit={handleUpdate} className="update-form">
                    <StyledSelect
                        name="status"
                        label="Status"
                        value={Available}
                        onChange={(e) => { setAvailable(parseInt(e.target.value)) }}
                        options={[
                            { id: '0', value: '0', label: 'Desabilitado' },
                            { id: '1', value: '1', label: 'Habilitado' }
                        ]}
                    />

                    <StyledInput
                        name="name"
                        label="Nome Completo"
                        defaultValue={`${Name}`}
                        onChange={(e) => { setName(e.target.value) }}
                    />

                    <StyledInput
                        name="phone"
                        label="Telefone"
                        defaultValue={`${Phone}`}
                        onChange={(e) => { setPhone(e.target.value) }}
                    />

                    <StyledInput
                        name="email"
                        label="E-mail"
                        type="email"
                        defaultValue={`${Email}`}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />

                    <StyledTextArea
                        name="bio"
                        label="Biografia"
                        defaultValue={`${Bio}`}
                        onChange={(e) => { setBio(e.target.value) }}
                    />

                    <div className="grid-container-pass">
                        <div className="credentials">
                            <StyledInput
                                name="password"
                                label="Trocar Senha"
                                type="password"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>
                        <div className="grid-item-pass">
                            <StyledInput
                                name="confirmpassword"
                                label="Confirmação da Senha"
                                type="password"
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
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