import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Container,
    Grid,

    withStyles,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Button,

    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar}
    from '@material-ui/core';
import NachrichtenList from "./NachrichtenList";
import StudooAPI from '../api/StudooAPI'
import {NachrichtBO} from "../api";
import ErstelleLerngruppeDialog from "./dialogs/ErstelleLerngruppeDialog";
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
            addingError: null
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

    componentDidMount() {
        this.getLerngruppe()
        this.getChatpartner()
    }

    render() {
        const { classes } = this.props;
        const { konversation, lerngruppe, chatpartner, chatteilnahme, neueNachricht, neueNachrichtValidationFailed,
            neueNachrichtEdited, deleteButtonPressed, showErstelleLerngruppeDialog } = this.state;


        return (
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
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
                                                        {chatpartner.getName()}  <br/>
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
                                            Nachrichtenvorschau
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </Grid>

                    <Grid item xs>
                        <Typography>
                            {/*<b>KonversationsID: {konversation.getID()}</b> <br/><br/>

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
                            <br/>*/}

                        </Typography>
                    </Grid>

                </Grid>
            </Box>
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
