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

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
        const NewTitle = Title.replace(/<[^>]+>/g, '');
        const NewText = Text.replace(/<[^>]+>/g, '');

        if (NewTitle.length === 0 || NewText.length === 0) {
            alterFAQError('incompleteFAQ');
        } else {
            Successful = true;
        }

        if (Successful === true) {
            alterFAQSuccess(updateFAQItems[0].id, URL, Title, Desc, Text, Location);
        }
    }

    const Modules = {
        toolbar: ['bold', 'italic', 'underline', 'strike', { 'color': ['#212121', '#FF0000', '#FBFF00', '#15FF00', '#00F7FF', '#001AFF', '#FF00E6'] }, { 'background': ['#FFFFFF', '#212121', '#FF0000', '#FBFF00', '#15FF00', '#00F7FF', '#001AFF', '#FF00E6'] }, 'link']
    }

    return (
        <div className="update">
            <main>
                <div className="update-top">Edição do FAQ {updateFAQItems[0].id}</div>
                <form onSubmit={handleUpdate} className="update-form">
                    <p className="input">Título:</p>
                    <ReactQuill
                        theme="snow"
                        value={Title.toString()}
                        onChange={setTitle}
                        modules={Modules}
                    />
                    <div className="editor-space"></div>

                    <p className="input">Descrição:</p>
                    <ReactQuill
                        theme="snow"
                        value={Desc.toString()}
                        onChange={setDesc}
                        modules={Modules}
                        placeholder="Esta pergunta frequente não tem uma descrição."
                    />
                    <div className="editor-space"></div>

                    <p className="input">Texto:</p>
                    <ReactQuill
                        theme="snow"
                        value={Text.toString()}
                        onChange={setText}
                        modules={Modules}
                    />
                    <div className="editor-space"></div>

                    <StyledInput
                        name="url"
                        label="URL"
                        defaultValue={`${URL}`}
                        onChange={(e) => { setURL(e.target.value) }}
                        placeholder="Esta pergunta frequente não tem um link."
                    />
                    <div className="editor-space"></div>

                    <StyledSelect
                        name="location"
                        label="Localização"
                        value={Location.valueOf()}
                        onChange={(e) => { setLocation(e.target.value) }}
                        options={[
                            { id: '0', value: 'Desativado', label: 'Desativado' },
                            { id: '1', value: 'FAQ', label: 'FAQ' },
                            { id: '2', value: 'Desk', label: 'Desk' },
                            { id: '3', value: 'Landing', label: 'Landing' }
                        ]}
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