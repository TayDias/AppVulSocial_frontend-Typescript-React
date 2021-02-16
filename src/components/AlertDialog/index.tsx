import React, { InputHTMLAttributes } from "react"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core"

import './styles.css'

interface AlertProps extends InputHTMLAttributes<HTMLInputElement> {
    alertProps: {
        title: string,
        descripton: string,
        optionOne: string,
        optionTwo: string,
        type: string,
    },
    isOpen: boolean,
    onAccept: any,
    onClose: any
}

/* eslint-disable */
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
                        <span>{props.alertProps.title}</span>
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="description" className="alert-description">
                            <span>{props.alertProps.descripton}</span>
                        </DialogContentText>
                    </DialogContent>

                    { props.alertProps.type === "choose" ? 
                        <DialogActions className="alert-actions">
                            <button onClick={handleDisagree} className="decline">
                                {props.alertProps.optionOne}
                            </button>
                            <button onClick={handleAgree} className="confirm">
                                {props.alertProps.optionTwo}
                            </button>
                        </DialogActions>

                    : props.alertProps.type === "confirm" ?
                        <DialogActions className="alert-actions">
                            <button onClick={handleDisagree} className="decline">
                                {props.alertProps.optionOne}
                            </button>
                        </DialogActions>
                    : null
                    }
                </div>    
            </Dialog>         
        </div>
    )
  
}

export default AlertDialog
