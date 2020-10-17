import React from 'react'
import StyledInput from '../StyledInput'
import StyledSelect from '../StyledSelect'

import './styles.css'

interface PageScheduleProps {
    from: string,
    to: string,
    weekday: string
}

const Schedule: React.FC<PageScheduleProps> = props => {
    return (
        <article className="schedule">
            <div className="input-block">
                <div key={Math.random()} className="schedule-item">
                    <StyledSelect 
                        name="weekday" 
                        label="Dia da Semana"
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
                        />
                        <StyledInput 
                            name="to" 
                            label="Até" 
                            type="time"
                        />
                </div>     
            </div>
        </article>
    )
}

export default Schedule