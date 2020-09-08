import React, { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import StyledInput from '../../components/StyledInput'
import StyledTextArea from '../../components/StyledTextArea'
import StyledSelect from '../../components/StyledSelect'

import './styles.css'

import warningIcon from '../../assets/images/icons/warning.svg'

function Register() {
    const [scheduleItems, setScheduleItems] = useState([
        { weekday: 0, from: '', to: '' }
    ])

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            { weekday: 0, from: '', to: '' }
        ])
    }

    return (
        <div id="page-register" className="container">
            <PageHeader 
                title='Que incrível que você quer ajudar.' 
                description="O primeiro passo, é preencher esse formulário de inscrição."
            />
            
            <main>
                <fieldset>
                    <legend>Seus dados</legend>

                    <StyledInput name="name" label="Nome Completo" />
                    <StyledInput name="phone" label="Telefone" />
                    <StyledInput name="email" label="E-mail" type="email" />

                    <StyledTextArea name="bio" label="Biografia" />
                </fieldset>

                <fieldset>
                    <legend>Atuação</legend>

                    <StyledSelect 
                        name="area" 
                        label="Área" 
                        options={[
                            {id: '1', label: 'Assitencia Social'},
                            {id: '2', label: 'Pedagogia'},
                            {id: '3', label: 'Psicologia'},
                        ]}
                    />
                </fieldset>

                <fieldset>
                    <legend>Credenciais</legend>

                    <div className="input-block">
                        <div className="credentials">
                            <StyledInput name="password" label="Senha de Acesso" type="password" />
                            <StyledInput name="confirmpassword" label="Confirmação da Senha" type="password" />
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
                        {scheduleItems.map(scheduleItem => {
                            return (
                                <div key={Math.random()} className="schedule-item">
                                    <StyledSelect 
                                        name="weekday" 
                                        label="Dia da Semana" 
                                        options={[
                                            {id: '0', label: 'Domingo'},
                                            {id: '1', label: 'Segunda-Feira'},
                                            {id: '2', label: 'Terça-Feira'},
                                            {id: '3', label: 'Quarta-Feira'},
                                            {id: '4', label: 'Quinta-Feira'},
                                            {id: '5', label: 'Sexta-Feira'},
                                            {id: '6', label: 'Sábado'}                     
                                        ]}
                                    />
        
                                    <StyledInput name="from" label="Das" type="time" />
                                    <StyledInput name="to" label="Até" type="time" />
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
                    <button type="button">
                        Salvar cadastro
                    </button>
                </footer>
            </main>
        </div>
    )
}

export default Register