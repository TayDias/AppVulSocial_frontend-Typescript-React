import React, { SelectHTMLAttributes } from 'react'

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string
    label: string
    options: Array<{
        id: string
        value: string
        label: string
    }>
}

const StyledSelect: React.FC<SelectProps> = ( { name, label, options, ...rest } ) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest}>
                <option id="0" value="Selecione uma Opção" disabled hidden>Selecione uma opção</option>

                {options.map(option => {
                    return <option key={option.id} value={option.value} id={option.id}>{option.label}</option>
                })}
            </select>
        </div>
    )
}

export default StyledSelect