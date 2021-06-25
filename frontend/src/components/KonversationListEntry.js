import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    TextField, Button
} from '@material-ui/core';
import NachrichtenList from "./NachrichtenList";
import StudooAPI from '../api/StudooAPI'
import {NachrichtBO} from "../api";
import ErstelleLerngruppeDialog from "./dialogs/ErstelleLerngruppeDialog";
import PopUpProfil from "./dialogs/PopUpProfil";

class KonversationListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            konversation: props.konversation,
            lerngruppe: null,     // falls die Konversation ein Gruppenchat ist, ist das die zugehörige Lerngruppe
            chatpartner: null,
            chatteilnahme: null,
            neueNachricht: null,
            neueNachrichtValidationFailed: false,
            neueNachrichtEdited: false,
            deleteButtonPressed: false,
            showErstelleLerngruppeDialog: false,
            error: null,
            loadingInProgress: false,
            addingInProgress: false,
            addingError: null,
            showProfilPopUp: false,
            reload: false
        }
        this.baseState = this.state
    }

    getLerngruppe = () => {
        if (this.state.konversation.ist_gruppenchat){
            StudooAPI.getAPI().getLerngruppeOfKonversationID(this.state.konversation.getID())
                .then(lerngruppe => {
                    this.setState({
                        lerngruppe: lerngruppe,
                        error: null,
                        loadingInProgress: false
                    })
                }).catch(e => this.setState({
                lerngruppe: null,
                error: e,
                loadingInProgress: false
            }));

            this.setState({
                loadingInProgress: true,
                error: null
            });
        }
    }

    getChatpartner = () => {
        if (!this.state.konversation.ist_gruppenchat){
            StudooAPI.getAPI().getPersonenByKonversationID(this.state.konversation.getID())
                .then(personen => {
                    personen.map(person => {
                        if (person.getID() !== this.props.person.getID()) {
                            this.setState({
                            chatpartner: person,
                            error: null,
                            loadingInProgress: false
                        })
                        }
                    })

                }).catch(e => this.setState({
                chatpartner: null,
                error: e,
                loadingInProgress: false
            }));

            this.setState({
                loadingInProgress: true,
                error: null
            });
        }
    }

    textFieldValueChange = (event) => {
        const value = event.target.value;

        let error = false;
        if (value.trim().length === 0) {
            error= true;
        }

        this.setState({
            [event.target.id]: event.target.value,
            [event.target.id + 'ValidationFailed']: error,
            [event.target.id + 'Edited']: true
        })
    }

    addNachricht = () => {
        let newNachricht = new NachrichtBO(this.state.neueNachricht, this.props.person.getID(),
            this.state.konversation.getID());
        StudooAPI.getAPI().addNachricht(newNachricht)
            .then(nachricht => {
                this.setState(this.baseState)
            }).catch(e =>
        this.setState({
            addingInProgress: false,
            addingError: e
        }));

        this.setState({
            addingInProgress: true,
            addingError: null
        })
        setTimeout(this.refreshPage,100)
    }

    deleteChatTeilnahme = () => {
        StudooAPI.getAPI().getChatTeilnahmeByPersonIDundKonversationID(this.props.person.getID(),this.props.konversation.getID())
            .then(chatTeilnahme => {
                this.setState({
                    chatteilnahme: chatTeilnahme,
                    deleteButtonPressed: true
                })
                StudooAPI.getAPI().deleteChatTeilnahme(chatTeilnahme.getID())
            })
        setTimeout(this.refreshPage,100)
    }

    openErstelleLerngruppeDialog = () => {
        this.setState({
            showErstelleLerngruppeDialog: true
        })
    }

    erstelleLerngruppeDialogClosed = lerngruppe => {
        this.setState({
            showErstelleLerngruppeDialog: false
        })
    }

    /** Handles the onClick event of the Popup person button */
    popUpButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
          showProfilPopUp: true
        });
    }

    popUpClosed = (event) => {
        this.setState({
          showProfilPopUp: false
        });
    }

    refreshPage = () => {
        window.location.reload()
    }

    componentDidMount() {
        this.getLerngruppe()
        this.getChatpartner()
    }

    render() {
        const { classes } = this.props;
        const { konversation, lerngruppe, chatpartner, chatteilnahme, neueNachricht, neueNachrichtValidationFailed,
            neueNachrichtEdited, deleteButtonPressed, showErstelleLerngruppeDialog, showProfilPopUp } = this.state;

        return (
            <div>
                <Typography>
                        ----------------- <br/>
                        KonversationsID: {konversation.getID()} <br/>
                    {
                        lerngruppe ?
                            <Typography>
                                Gruppenchat von "{lerngruppe.getGruppenname()}"
                            </Typography>
                            : null
                    }
                    {
                        chatpartner ?
                            <>
                                <Typography>
                                    Chat mit:&nbsp;
                                    <Button onClick={this.popUpButtonClicked}>
                                        {
                                            chatpartner.getName()
                                        }
                                    </Button> &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button disabled={deleteButtonPressed} color={"secondary"} variant={"contained"} onClick={this.deleteChatTeilnahme}>
                                        Chat löschen
                                    </Button>
                                    <Button disabled={deleteButtonPressed} color={"primary"} variant={"contained"} onClick={this.openErstelleLerngruppeDialog} >
                                        Gruppe erstellen
                                    </Button>
                                    <ErstelleLerngruppeDialog show={showErstelleLerngruppeDialog} person={this.props.person} chatpartner={chatpartner} onClose={this.erstelleLerngruppeDialogClosed}/>
                                </Typography>
                            </>
                            : null
                    }
                        -----------------
                        <NachrichtenList
                            currentPerson={this.props.person}
                            konversation={konversation}
                        />
                    <br/>
                    <TextField type='text' id='neueNachricht' value={neueNachricht} onChange={this.textFieldValueChange}
                    error={neueNachrichtValidationFailed}>
                        Test
                    </TextField>&nbsp;&nbsp;
                    <Button color="primary" variant='contained' disabled={ !(neueNachrichtEdited && !neueNachrichtValidationFailed) }
                    onClick={this.addNachricht}>
                        Nachricht senden
                    </Button>
                    <br/>

                <PopUpProfil show={showProfilPopUp} person={chatpartner}  onClose={this.popUpClosed} />
                </Typography>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        width: '1ßß%',
    }
});

KonversationListEntry.propTypes = {
    konversation: PropTypes.object.isRequired,
}

export default withStyles(styles)(KonversationListEntry);
