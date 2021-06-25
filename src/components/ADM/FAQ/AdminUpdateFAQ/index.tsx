//https://zenoamaro.github.io/react-quill/

import React, { FormEvent, InputHTMLAttributes, useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import PageHeader from '../../../PageHeader';
import StyledInput from '../../../StyledInput';
import StyledTextArea from '../../../StyledTextArea';
import StyledSelect from '../../../StyledSelect';
import AlertDialog from '../../../AlertDialog';
import uuidv4 from '../../../../utils/generateUuidv4';
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css'

interface PageAdminUpdateFAQProps extends InputHTMLAttributes<HTMLInputElement> {
    updateFAQItems: {
        id: number,
        url: String,
        title: String,
        desc: String,
        text: String,
        location: String,
    }[],
    alterFAQSuccess: any,
    alterFAQError: any,
    editExit: any
}

const AdminUpdateFAQ: React.FC<PageAdminUpdateFAQProps> = ({ alterFAQSuccess, alterFAQError, updateFAQItems, editExit, ...rest }) => {
    const history = useHistory();
    
    const [URL, setURL] = useState(updateFAQItems[0].url);
    const [Title, setTitle] = useState(updateFAQItems[0].title);
    const [Desc, setDesc] = useState(updateFAQItems[0].desc);
    const [Text, setText] = useState(updateFAQItems[0].text);
    const [Location, setLocation] = useState(updateFAQItems[0].location);

    async function handleUpdate(e: FormEvent) {
        e.preventDefault();

        let Successful = false
        if (Title.length === 0 || Desc.length === 0 || Text.length === 0) {
            alterFAQError('incomplete');
        } else {
            Successful = true;
        }

        if (Successful === true) {
            alterFAQSuccess(updateFAQItems[0].id, URL, Title, Desc, Text, Location);
        }
    }

    return (
        <div className="update">
            <main>
                <div className="update-top">Edição do FAQ {updateFAQItems[0].id}</div>
                <form onSubmit={handleUpdate} className="update-form">
                    {/*<StyledSelect
                        name="location"
                        label="Localização"
                        value={Location}
                        onChange={(e) => { setLocation(parseInt(e.target.value)) }}
                        options={[
                            { id: '0', value: '0', label: 'Desabilitado' },
                            { id: '1', value: '1', label: 'Habilitado' }
                        ]}
                    />*/}

                    <StyledInput
                        name="url"
                        label="URL"
                        defaultValue={`${URL}`}
                        onChange={(e) => { setURL(e.target.value) }}
                    />

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

export default AdminUpdateFAQ