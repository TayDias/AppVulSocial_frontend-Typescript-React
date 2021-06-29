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

interface PageAdminInsertFAQProps extends InputHTMLAttributes<HTMLInputElement> {
    insertFAQItems: {
        url: String,
        title: String,
        desc: String,
        text: String,
        location: String,
    }[],
    insertFAQSuccess: any,
    insertFAQError: any,
    editExit: any
}

const AdminInsertFAQ: React.FC<PageAdminInsertFAQProps> = ({ insertFAQSuccess, insertFAQError, insertFAQItems, editExit, ...rest }) => {
    const history = useHistory();

    const [URL, setURL] = useState(insertFAQItems[0].url);
    const [Title, setTitle] = useState(insertFAQItems[0].title);
    const [Desc, setDesc] = useState(insertFAQItems[0].desc);
    const [Text, setText] = useState(insertFAQItems[0].text);
    const [Location, setLocation] = useState(insertFAQItems[0].location);

    async function handleInsert(e: FormEvent) {
        e.preventDefault();

        let Successful = false
        const NewTitle = Title.replace(/<[^>]+>/g, '');
        const NewText = Text.replace(/<[^>]+>/g, '');

        if (NewTitle.length === 0 || NewText.length === 0) {
            insertFAQError('incompleteFAQ');
        } else {
            Successful = true;
        }

        if (Successful === true) {
            insertFAQSuccess(URL, Title, Desc, Text, Location);
        }
    }

    const Modules = {
        toolbar: ['bold', 'italic', 'underline', 'strike', { 'color': ['#212121', '#FF0000', '#FBFF00', '#15FF00', '#00F7FF', '#001AFF', '#FF00E6'] }, { 'background': ['#FFFFFF', '#212121', '#FF0000', '#FBFF00', '#15FF00', '#00F7FF', '#001AFF', '#FF00E6'] }, 'link']
    }

    return (
        <div className="update">
            <main>
                <div className="update-top">Cadastrar FAQ</div>
                <form onSubmit={handleInsert} className="update-form">
                    <p className="input">Título:</p>
                    <ReactQuill
                        theme="snow"
                        value={Title.toString()}
                        onChange={setTitle}
                        modules={Modules}
                        placeholder="Insira um título. (CAMPO OBRIGATÓRIO)"
                    />
                    <div className="editor-space"></div>

                    <p className="input">Descrição:</p>
                    <ReactQuill
                        theme="snow"
                        value={Desc.toString()}
                        onChange={setDesc}
                        modules={Modules}
                        placeholder="Insira uma descrição breve. (CAMPO NÃO OBRIGATÓRIO)"
                    />
                    <div className="editor-space"></div>

                    <p className="input">Texto:</p>
                    <ReactQuill
                        theme="snow"
                        value={Text.toString()}
                        onChange={setText}
                        modules={Modules}
                        placeholder="Insira um texto. (CAMPO OBRIGATÓRIO)"
                    />
                    <div className="editor-space"></div>

                    <StyledInput
                        name="url"
                        label="URL"
                        defaultValue={`${URL}`}
                        onChange={(e) => { setURL(e.target.value) }}
                        placeholder="Insira um link. (CAMPO NÃO OBRIGATÓRIO)"
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
                            Voltar sem Adicionar
                        </button>
                        <button type="submit">
                            Adicionar
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default AdminInsertFAQ