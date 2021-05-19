import React, { InputHTMLAttributes } from 'react'
import './styles.css'
import 'react-dom'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface PageHelpProps extends InputHTMLAttributes<HTMLInputElement> {
    helpItems: {
        id: number,
        url: string,
        title: string,
        desc: string,
        text: string,
        location: string
    }[],
}

const Help: React.FC<PageHelpProps> = ({ helpItems, ...rest }) => {
    return (
        <article className="help">
            {helpItems.map((helpItem, index) => {
                return (
                    <div>
                        <div key={Math.random()} className="help">
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-corntols="panel1a-content" id="panel1a-header">
                                    <Typography>
                                        <p className="AC-Title" dangerouslySetInnerHTML={{__html: `${helpItem.title}`}}></p>
                                        <br></br>
                                        <p className="AC-Desc" dangerouslySetInnerHTML={{__html: `${helpItem.desc}`}}></p>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails className="AC-Border">
                                    <Typography>
                                        <p className="AC-Text" dangerouslySetInnerHTML={{__html: `${helpItem.text}`}}></p>
                                        {helpItem.url != null ?
                                            <a href={helpItem.url} target="_blank">
                                                <button type="button" id="access" className="access-button">Acessar</button>
                                            </a>
                                            :
                                            <div></div>
                                        }
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                )
            })}
        </article>
    )
}

export default Help