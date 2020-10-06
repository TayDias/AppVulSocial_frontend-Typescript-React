import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router'

import PageHeader from '../../components/PageHeader'
import StyledInput from '../../components/StyledInput'
import StyledTextArea from '../../components/StyledTextArea'
import StyledSelect from '../../components/StyledSelect'

import './styles.css'

import warningIcon from '../../assets/images/icons/warning.svg'
import api from '../../services/api'

function Register() {
    const history = useHistory()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [specialty_id, setSpecialtyId] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [scheduleItems, setScheduleItems] = useState([
        { weekday: 'Domingo', from: '', to: '' }
    ])

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            { weekday: 'Domingo', from: '', to: '' }
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

    function handleRegister(e: FormEvent) {
        e.preventDefault()

        if(password === confirmPassword){
            api.post('rescuers', {
                name,
                phone,
                bio,
                email,
                password,
                specialty_id,
                schedules: scheduleItems
            }).then(() => {
                alert('Cadastro realizado com sucesso')

                history.push('/')
            }).catch(() => {
                alert('Erro no cadastro!')
            })
        }

        else {
            alert('As senha não confere com a confirmação da senha')
        }

    }

    return (
        <div id="page-register" className="container">
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
                                {id: '1', value: '1', label: 'Assitencia Social'},
                                {id: '2', value: '2', label: 'Pedagogia'},
                                {id: '3', value: '3', label: 'Psicologia'},
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
                            Horários Disponíveis
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
                                                {id: '0', value: 'Domingo', label: 'Domingo'},
                                                {id: '1', value: 'Segunda-Feira', label: 'Segunda-Feira'},
                                                {id: '2', value: 'Terça-Feira', label: 'Terça-Feira'},
                                                {id: '3', value: 'Quarta-Feira', label: 'Quarta-Feira'},
                                                {id: '4', value: 'Quinta-Feira', label: 'Quinta-Feira'},
                                                {id: '5', value: 'Sexta-Feira', label: 'Sexta-Feira'},
                                                {id: '6', value: 'Sábado', label: 'Sábado'}                     
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
                            Preencha todos os dados
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