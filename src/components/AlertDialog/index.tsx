import React, { InputHTMLAttributes } from "react"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core"

import './styles.css'

interface AlertProps extends InputHTMLAttributes<HTMLInputElement> {
    alertProps: {
        title: string,
        descripton: string,
        optionOne: string,
        optionTwo: string,
    }
    isOpen: boolean,
    onAccept: any
    onClose: any
}

const AlertDialog: React.FC<AlertProps> = ( props ) => { 
    function handleAgree () {
        props.onAccept()
        props.onClose()
    }

    function handleDisagree () {
        props.onClose()
    }

    return (
      <div>
            <Dialog
                open={props.isOpen}
                onClose={props.onClose}
                className="alert"
            >
                <div className="content" id="container">           
                    <DialogTitle id="title" className="alert-title">
                        <text>{props.alertProps.title}</text>
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="description" className="alert-description">
                            <text>{props.alertProps.descripton}</text>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions className="alert-actions">
                        <button onClick={handleDisagree} className="decline">
                            {props.alertProps.optionOne}
                        </button>
                        <button onClick={handleAgree} className="confirm">
                            {props.alertProps.optionTwo}
                        </button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
  
}

export default AlertDialog
