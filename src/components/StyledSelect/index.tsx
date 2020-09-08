import React, { SelectHTMLAttributes } from 'react'

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string
    label: string
    options: Array<{
        id: string
        label: string
    }>
}

const StyledSelect: React.FC<SelectProps> = ( { name, label, options, ...rest } ) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select defaultValue="" id={name} {...rest}>
                <option id="0" disabled hidden>Selecione uma opção</option>

                {options.map(option => {
                    return <option key={option.id} id={option.id}>{option.label}</option>
                })}
            </select>
        </div>
    )
}

export default StyledSelect