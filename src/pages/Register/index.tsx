import React, { useState, FormEvent, useEffect } from 'react'
import { useHistory } from 'react-router'

import api from '../../services/api'
import blipApi from '../../services/blipApi'

import PageHeader from '../../components/PageHeader'
import StyledInput from '../../components/StyledInput'
import StyledTextArea from '../../components/StyledTextArea'
import StyledSelect from '../../components/StyledSelect'
import AlertDialog from '../../components/AlertDialog'
import uuidv4 from '../../utils/generateUuidv4'
import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'

/* eslint-disable */
function Register() {
    const history = useHistory()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [specialty_id, setSpecialtyId] = useState('1')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [scheduleItems, setScheduleItems] = useState([
        { weekday: 'Domingo', from: '00:00', to: '00:00' }
    ])

    // FUNÇOES DE GERENCIAMENTO DE MENSAGEM DE ALERTA //
    const [alertData, changeAlertData]  = useState({
        title: "",
        descripton: "",
        optionOne: "",
        optionTwo: "",
        type: ""
    })
    
    const [alertDialogIsOpen, changeAlertDialogStatus ] = useState(false)

    useEffect(() => {
        if(alertDialogIsOpen){
            if(alertData.type === 'visualize'){
                setTimeout(()=>{
                    handleCloseAlert()
                }, 2500)    //tempo de permanencia do alerta na tela
            }
        }

    }, [alertDialogIsOpen]) 

    function choseAlertData(option: string) {
        if (option === "success"){
            changeAlertData({
                title: "Bem vindo(a) a nossa rede!",
                descripton: "Seu cadastro foi realizado com sucesso.",
                optionOne: "",
                optionTwo: "",
                type: "visualize"
            })
        }
        else if (option === "error"){
            changeAlertData({
                title: "Ops!",
                descripton: "Ocorreu um erro ao fazer o cadastro. Por favor, verifique se os seus dados estão corretos.",
                optionOne: "Ok!",
                optionTwo: "",
                type: "confirm"
            })
        }  
        else if (option === "incomplete"){
            changeAlertData({
                title: "Ops!",
                descripton: "Por favor, preencha todos os dados antes de salvar",
                optionOne: "",
                optionTwo: "",
                type: "visualize"
            })
        } 
        else if (option === "password"){
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
    
    async function handleCloseAlert () {
        changeAlertDialogStatus(false)
    }

    // FUNÇOES DE CONTROLE DE DADOS NA INTERFACE //
    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            { weekday: 'Domingo', from: '00:00', to: '00:00' }
        ])
    }

    function setScheduleItemValue(position:number, field: string, value:string){
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            //Item percorrido igual ao item de alteração
            if(index === position) {
                return {
                    ...scheduleItem,
                    [field]: value  //sobrescreve o item com o novo valor
                }
            }
            return scheduleItem
        })

        setScheduleItems(updatedScheduleItems)
    }

    // FUNÇOES DE OPERAÇÕES EM BANCO DE DADOS E API TERCEIRA //
    async function handleRegister(e: FormEvent) {
        e.preventDefault()

        let successful = false

        if(name.length === 0 || phone.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0 || scheduleItems.length === 0) {
            choseAlertData('incomplete')
            handleOpenAlert()
        }
        else{   
            if(password === confirmPassword){
                await api.post('rescuers', {
                    name,
                    phone,
                    bio,
                    email,
                    password,
                    specialty_id,
                    schedules: scheduleItems
                }).then(() => {
                    successful = true
                    choseAlertData('success')
                    handleOpenAlert()

                }).catch(() => {
                    choseAlertData('error')
                    handleOpenAlert()
                })
            }

            else {
                choseAlertData('password')
                handleOpenAlert()
            }
        }

        if(successful) {
            handleCreateBlipAddAgent()

            setTimeout(()=>{
                history.push('/')
            }, 3000)
        }

    }

    async function handleCreateBlipAddAgent() {
        let identity = email.replace('@', '%40').concat('@blip.ai')
        let id = uuidv4()

        await blipApi.post('', {
            id: id,
            to: "postmaster@desk.msging.net",
            method: "set",         
            uri: "/attendants",
            type: "application/vnd.iris.desk.attendant+json",
            resource: {
                identity: identity,
                email: email,
                teams: [
                    "Default"
                ]
            }          

        }).then(() => {
            localStorage.setItem('addBlip', 'sim')
            localStorage.setItem('primeiroAcesso', email)

        }).catch(() => {
            localStorage.setItem('addBlip', 'não')

         })

    }

    return (
        <div id="page-register" className="container">
            <AlertDialog 
                alertProps = {alertData}
                isOpen = {alertDialogIsOpen}
                onAccept= {() => {}}
                onClose= {handleCloseAlert}
            />

            <PageHeader 
                title='Que incrível que você quer ajudar.' 
                description="O primeiro passo, é preencher esse formulário de inscrição."
            />
            
            <main>
                <form onSubmit={handleRegister}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <StyledInput 
                            name="name" 
                            label="Nome Completo" 
                            value={name} 
                            onChange={(e) => { setName(e.target.value) }} 
                        />

                        <StyledInput 
                            name="phone" 
                            label="Telefone"
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                        />

                        <StyledInput 
                            name="email" 
                            label="E-mail" 
                            type="email" 
                            value={email}
                            onChange={(e) => { setEmail(e.target.value )}}
                        />

                        <StyledTextArea 
                            name="bio" 
                            label="Biografia" 
                            value={bio}
                            onChange={(e) => { setBio(e.target.value )}}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Atuação</legend>

                        <StyledSelect 
                            name="area" 
                            label="Área" 
                            value={specialty_id}
                            onChange={(e) => setSpecialtyId(e.target.value)}
                            options={[
                                {id: '1', value: '1', label: 'Assitência Social'},
                                {id: '2', value: '2', label: 'Pedagogia'},
                                {id: '3', value: '3', label: 'Psicologia'},
                                {id: '4', value: '4', label: 'Outra'}
                            ]}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Credenciais</legend>

                        <div className="input-block">
                            <div className="credentials">
                                <StyledInput 
                                    name="password" 
                                    label="Senha de Acesso" 
                                    type="password"
                                    value={password} 
                                    onChange={(e) => { setPassword(e.target.value) }} 
                                />

                                <StyledInput 
                                    name="confirmpassword" 
                                    label="Confirmação da Senha" 
                                    type="password"
                                    value={confirmPassword} 
                                    onChange={(e) => { setConfirmPassword(e.target.value) }} 
                                />
                            </div>
                        </div>       
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários de atendimento
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horário
                            </button>
                        </legend>

                        <div className="input-block">
                            {scheduleItems.map((scheduleItem, index) => {
                                return (
                                    <div key={Math.random()} className="schedule-item">
                                        <StyledSelect 
                                            name="weekday" 
                                            label="Dia da Semana"
                                            value={scheduleItem.weekday}
                                            onChange={e => setScheduleItemValue(index, 'weekday', e.target.value)}
                                            options={[
                                                {id: '0', value: '0', label: 'Domingo'},
                                                {id: '1', value: '1', label: 'Segunda-Feira'},
                                                {id: '2', value: '2', label: 'Terça-Feira'},
                                                {id: '3', value: '3', label: 'Quarta-Feira'},
                                                {id: '4', value: '4', label: 'Quinta-Feira'},
                                                {id: '5', value: '5', label: 'Sexta-Feira'},
                                                {id: '6', value: '6', label: 'Sábado'}                     
                                            ]}
                                        />
            
                                        <StyledInput 
                                            name="from" 
                                            label="Das" 
                                            type="time"
                                            value={scheduleItem.from}
                                            onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                        />
                                        <StyledInput 
                                            name="to" 
                                            label="Até" 
                                            type="time"
                                            value={scheduleItem.to}
                                            onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                        />
                                    </div>
                                )
                            })}            
                        </div>
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Importante" />
                            Importante! <br />
                            Preencha todos os dados antes de salvar
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default Register