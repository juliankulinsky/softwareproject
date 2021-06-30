import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Container,
    IconButton }
    from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {StudooAPI} from "../api";
import ContextErrorMessage from "./dialogs/ContextErrorMessage";
import "./components-theme.css";


/** Diese Component stellt einen Listeneintrag der Auflistung der aktuell existierenden Nachrichten dar.
 * Diese Component wird in NachrichtenList entsprechend der Anzahl an existierenden Nachrichten aufgerufen. */

class NachrichtListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nachricht: props.nachricht,
            absenderPerson: null,
            currentPerson: props.currentPerson,
            buttonPressed: false,
            error: null,
            loadingInProgress: false
        }
    }

    /** Lädt das PersonBO des Absenders eines bestimmten NachrichtBOs über die API aus dem Backend.*/
    getAbsenderPerson = () => {
        StudooAPI.getAPI().getPerson(this.props.nachricht.getAbsenderID())
            .then(absenderPerson => {
                this.setState({
                    absenderPerson: absenderPerson,
                    error: null,
                    loadingInProgress: false
                })
            }).catch(e => this.setState({
            absenderPerson: null,
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    /** Löscht über die API eine im Backend gespeicherte Nachricht. */
    deleteNachricht = () => {
        this.setState({
            buttonPressed: true,
        })
        StudooAPI.getAPI().deleteNachricht(this.state.nachricht.getID())
    }

    /** Gibt die vom User geschriebenen Nachrichten einer Konversation inklusive eines Löschen-Buttons
     * für die Render Methode aus. */
    EigeneNachricht = () => {
        return <div className="nachrichtRight">
                    <div className="chatBubbleRight">
                        {
                            this.state.nachricht.getInhalt()
                        }

                        <div className="nachrichtAbsender">
                            von dir
                        </div>
                    </div>

                    <IconButton disabled={this.state.buttonPressed}
                                aria-label={"delete"}
                                onClick={this.deleteNachricht}
                                variant={"contained"} >
                        <DeleteIcon />
                    </IconButton>
               </div>
    }

    /** Gibt die von den Lerngruppen-Partner und Lernpartnern geschriebenen Nachrichten aus. */
    FremdeNachricht = () => {
        return <div className="nachrichtLeft">
            <div className="chatBubbleLeft">
                {
                    this.state.nachricht.getInhalt()
                }

                <div className="nachrichtAbsender">
                    von {this.state.absenderPerson.getName()}
                </div>
            </div>
        </div>
    }

    /** Zeigt  einzelne Nachrichten an. */
    Anzeige = () => {
        if (this.state.currentPerson.getID()===this.state.absenderPerson.getID()){
            return this.EigeneNachricht()
        }
        else {
            return this.FremdeNachricht()
        }
    }

    /** Die Lifecycle Methode, welche bei Aufruf für die Einfügung der Component in den DOM sorgt. */
    componentDidMount() {
        this.getAbsenderPerson()
    }

    /** Rendert die Component. */
    render() {
        const { classes } = this.props;
        const { nachricht, absenderPerson, currentPerson, error, loadingInProgress } = this.state;

        return (
            <Container className="root">
                <Typography>
                    {
                        absenderPerson ?
                        this.Anzeige()
                            : null
                    }
                </Typography>

                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getAbsenderPerson}
                />
            </Container>
        )
    }
}

/** PropTypes */
NachrichtListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  nachricht: PropTypes.object.isRequired,

}

export default NachrichtListEntry;