import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import AlertDialog from '../../components/AlertDialog'

import './styles.css'

function Chat() {
  const history = useHistory()

  const [username] = useState('Vulnerável')
  const [message, setMessage] = useState('')

  let [alertDialogIsOpen, changeAlertDialogStatus ] = useState(false)

  const alertProps = {
    title: "Atenção!",
    descripton: "Deseja mesmo encerrar essa conversa?",
    optionOne: "Permanecer",
    optionTwo: "Encerrar Agora"
  }

  async function sendMessage() {
    console.log("Send message")
  }

  async function handleOpenAlert() {
    changeAlertDialogStatus(true)
  }

  function handleCloseAlert () {
    changeAlertDialogStatus(false)
}

  async function handleDisconect() {
    history.push("/profile")
  }

  return (
    <div id="page-chat" className="container">
      <AlertDialog 
        alertProps = {alertProps}
        isOpen = {alertDialogIsOpen}
        onAccept= {handleDisconect}
        onClose= {handleCloseAlert}
      />
      <form action="">
        <div className="item-group">
          <input
            className="username-input"
            name="username" 
            placeholder="E-MAIL" 
            value={username}
            disabled={true}
          />

          <button 
            className="disconect-button" 
            type="button" 
            onClick={() => handleOpenAlert()}>
              Encerrar Sessão
          </button>
        </div>

        <div className="card">
          <ul>
              <li className="othersMessages">
                <span>Atendente diz: </span>
                <p>Oi</p>
              </li>

              <li className="myMessages">
                <span>Vulnerável diz: </span>
                <p>Olá</p>
              </li>

              <li className="othersMessages">
                <span>Atendente diz: </span>
                <p>Teste</p>
              </li>

              <li className="myMessages">
                <span>Vulnerável diz: </span>
                <p>Teste</p>
              </li>

              <li className="othersMessages">
                <span>Atendente diz: </span>
                <p>Teste</p>
              </li>
          </ul>
        </div>

        <div className="item-group">
          <input
            name="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Digite a sua mensagem aqui"
          />

          <button 
            className="send-button" 
            type="submit" 
            onClick={() => sendMessage()}>
              ENVIAR
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat
