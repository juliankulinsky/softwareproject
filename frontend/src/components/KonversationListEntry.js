import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Container,
    Typography,
    Button,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar}
    from '@material-ui/core';
import StudooAPI from '../api/StudooAPI'
import {NachrichtBO} from "../api";
import ErstelleLerngruppeDialog from "./dialogs/ErstelleLerngruppeDialog";
import PopUpProfil from "./dialogs/PopUpProfil";
import "./components-theme.css";

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
            showProfilPopUp: false
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

    deleteChatTeilnahme = () => {
        StudooAPI.getAPI().getChatTeilnahmeByPersonIDundKonversationID(this.props.person.getID(),this.props.konversation.getID())
            .then(chatTeilnahme => {
                this.setState({
                    chatteilnahme: chatTeilnahme,
                    deleteButtonPressed: true
                })
                StudooAPI.getAPI().deleteChatTeilnahme(chatTeilnahme.getID())
            })
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

    componentDidMount() {
        this.getLerngruppe()
        this.getChatpartner()
    }

    render() {
        const { classes } = this.props;
        const { konversation, lerngruppe, chatpartner, chatteilnahme, neueNachricht, neueNachrichtValidationFailed,
            neueNachrichtEdited, deleteButtonPressed, showErstelleLerngruppeDialog, showProfilPopUp } = this.state;

        return (
            <Container>
                        <ListItem alignItems="flex-start">

                            <ListItemAvatar>
                                <Avatar alt="Wir brauchen noch Bilder" src="/components/chat/avatardummy.png"/>
                            </ListItemAvatar>

                            <ListItemText
                                primary = {
                                    <>
                                        {
                                            lerngruppe ?
                                                <Typography>
                                                    {lerngruppe.getGruppenname()}
                                                </Typography>
                                                : null
                                        }
                                        {
                                            chatpartner ?
                                                <>
                                                    <Typography>
                                                        <Button onClick={this.popUpButtonClicked}>
                                                            {
                                                                chatpartner.getName()
                                                            }
                                                        </Button>  <br/>
                                                        <Button disabled={deleteButtonPressed} color={"primary"} variant={"contained"} onClick={this.openErstelleLerngruppeDialog} >
                                                            Gruppe erstellen
                                                        </Button>
                                                        <ErstelleLerngruppeDialog show={showErstelleLerngruppeDialog} person={this.props.person} chatpartner={chatpartner} onClose={this.erstelleLerngruppeDialogClosed}/>
                                                        <Button disabled={deleteButtonPressed} color={"secondary"} variant={"contained"} onClick={this.deleteChatTeilnahme}>
                                                            Chat löschen
                                                        </Button>
                                                    </Typography>
                                                </>
                                                : null
                                        }
                                    </>
                                }

                                secondary = {
                                    <React.Fragment>
                                        <Typography>
                                            Klicke hier, um den Chat aufzurufen
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>

                        <PopUpProfil show={showProfilPopUp} person={chatpartner}  onClose={this.popUpClosed} />
            </Container>
        )
    }
}

const styles = theme => ({
    root: {
        width: '100%',
        flexGrow: 1
    }
});

KonversationListEntry.propTypes = {
    konversation: PropTypes.object.isRequired,
}

export default withStyles(styles)(KonversationListEntry);
