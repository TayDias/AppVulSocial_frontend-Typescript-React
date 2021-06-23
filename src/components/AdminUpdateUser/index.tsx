//https://zenoamaro.github.io/react-quill/

import React, { FormEvent, InputHTMLAttributes, useState, useEffect } from 'react'

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
    alterUser: any,
    editExit: any
}

const AdminUpdateUser: React.FC<PageAdminUpdateUserProps> = ({ alterUser, updateUserItems, editExit, ...rest }) => {
    const [Name, setName] = useState(updateUserItems[0].name);
    const [Available, setAvailable] = useState(updateUserItems[0].available);
    const [Phone, setPhone] = useState(updateUserItems[0].phone);
    const [Email, setEmail] = useState(updateUserItems[0].email);
    const [Bio, setBio] = useState(updateUserItems[0].bio);
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const [alertData, changeAlertData] = useState({
        title: "",
        descripton: "",
        optionOne: "",
        optionTwo: "",
        type: ""
    })

    const [alertDialogIsOpen, changeAlertDialogStatus] = useState(false)

    useEffect(() => {
        if (alertDialogIsOpen) {
            if (alertData.type === 'visualize') {
                setTimeout(() => {
                    handleCloseAlert()
                }, 2500)    //tempo de permanencia do alerta na tela
            }
        }

    }, [alertDialogIsOpen])

    function choseAlertData(option: string) {
        if (option === "success") {
            changeAlertData({
                title: "Salvo com sucesso!",
                descripton: "Edições do usuário salvo com sucesso.",
                optionOne: "",
                optionTwo: "",
                type: "visualize"
            })
        }
        else if (option === "incomplete") {
            changeAlertData({
                title: "Ops!",
                descripton: "Por favor, preencha todos os dados antes de salvar.",
                optionOne: "",
                optionTwo: "",
                type: "visualize"
            })
        }
        else if (option === "password") {
            changeAlertData({
                title: "Ops!",
                descripton: "Os campos senha e confirmação da senha não conferem.",
                optionOne: "",
                optionTwo: "",
                type: "visualize"
            })
        }
    }

    async function handleOpenAlert() {
        changeAlertDialogStatus(true)
    }

    async function handleCloseAlert() {
        changeAlertDialogStatus(false)
    }

    function handleUpdate() {
        if (Name !== "" || Phone !== "" || Email !== "" || Bio !== "") {
            if (Password === ConfirmPassword) {
                alterUser(updateUserItems[0].id, Name, updateUserItems[0].type, Available, Phone, Email, Bio, Password);
            } else {
                choseAlertData('password')
                handleOpenAlert()
            }
        } else {
            choseAlertData('incomplete')
            handleOpenAlert()
        }
    }

    return (
        <div className="update">
            <main>
                <div className="update-top">Edição do registro {updateUserItems[0].id}</div>
                <form className="update-form">
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
                        defaultValue={`${updateUserItems[0].name}`}
                        onChange={(e) => { setName(e.target.value) }}
                    />

                    <StyledInput
                        name="phone"
                        label="Telefone"
                        defaultValue={`${updateUserItems[0].phone}`}
                        onChange={(e) => { setPhone(e.target.value) }}
                    />

                    <StyledInput
                        name="email"
                        label="E-mail"
                        type="email"
                        defaultValue={`${updateUserItems[0].email}`}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />

                    <StyledTextArea
                        name="bio"
                        label="Biografia"
                        defaultValue={`${updateUserItems[0].bio}`}
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
                        <button type="button" onClick={() => handleUpdate()}>
                            Salvar alterações
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default AdminUpdateUser