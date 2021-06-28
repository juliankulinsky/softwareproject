import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Container,
    Card,
    Button,
    TextField,
    Grid,
    Typography}
    from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import NachrichtListEntry from "./NachrichtListEntry";
import {NachrichtBO} from "../api";
import ErstelleLerngruppeDialog from "./dialogs/ErstelleLerngruppeDialog";
import PopUpProfil from "./dialogs/PopUpProfil";
import "./components-theme.css";

class NachrichtenList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nachrichten: [],
            person: props.currentPerson,
            konversation: props.konversation,
            neueNachricht: null,
            neueNachrichtValidationFailed: false,
            neueNachrichtEdited: false,
            error: null,
            loadingInProgress: false,
            lerngruppe: null,
            chatpartner: null,
            deleteButtonPressed: false,
            showErstelleLerngruppeDialog: false,
        }
    }

    getNachrichten = () => {
        StudooAPI.getAPI().getNachrichtenByKonversationID(this.props.konversation.getID())
        .then(nachrichtenBOs => {
            this.setState({
                nachrichten: nachrichtenBOs,
                error: null,
                loadingInProgress: false
            });
            // console.log(this.state.nachrichten)
        }).catch(e => this.setState({
            nachrichten: [],
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
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
                        if (person.getID() !== this.props.currentPerson.getID()) {
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

    /** Nimmt den im Textfeld eingetragenen Inhalt an und prüft, ob die Nachricht nicht leer ist. */
    textFieldValueChange = (event) => {
        const value = event.target.value;

        let error = false;
        if (value.trim().length === 0) {
            error = true;
        }

        this.setState({
            neueNachricht: value,
            neueNachrichtValidationFailed: error,
            neueNachrichtEdited: true
        })
    }

    /** Speichert eine abgesendete Nachricht und zeigt diese direkt an. */
    addNachricht = () => {
        let newNachricht = new NachrichtBO(this.state.neueNachricht, this.props.currentPerson.getID(),
            this.props.konversation.getID());

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

        let tempNachrichten = this.state.nachrichten
        tempNachrichten.push(newNachricht)
        this.setState({
            nachrichten: tempNachrichten,
            neueNachricht: "",
            neueNachrichtValidationFailed: false,
            neueNachrichtEdited: false
        })
    }

    /** Die Nachrichten werden hier durch die setInterval Funktion alle 3 Sekunden neu von der Datenbank geladen.*/
    componentDidMount() {
        this.getLerngruppe();
        this.getChatpartner();
        this.getNachrichten();
        // this.interval = setInterval(() => this.getNachrichten(), 3000);
    }

    /*componentWillUnmount() {
        clearInterval(this.interval);
    }*/

    /** Hier werden  */
    chatAufruf = () => {
        const nachrichten = this.state.nachrichten

        if (nachrichten.length===0) {
            return <Typography>
                In dieser Konversation gibt es noch keine Nachrichten! <br/>
                Sei der Erste!
            </Typography>
        }

        else return nachrichten.map(nachricht =>
            <NachrichtListEntry
                key={nachricht.getID()}
                nachricht={nachricht}
                currentPerson={this.props.currentPerson}
            />)
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

    /** Für den Button zur Erstellung einer Lerngruppe aus einem Einzelchat heraus.*/
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

    /** Löscht Chat mit einzelnem Chat-Partner. */
    deleteChatTeilnahme = () => {
        StudooAPI.getAPI().getChatTeilnahmeByPersonIDundKonversationID(this.props.currentPerson.getID(),this.props.konversation.getID())
            .then(chatTeilnahme => {
                this.setState({
                    deleteButtonPressed: true
                })
                StudooAPI.getAPI().deleteChatTeilnahme(chatTeilnahme.getID())
            })
    }

    render() {
        const {classes} = this.props;
        const {nachrichten=[], error, neueNachricht, neueNachrichtValidationFailed, neueNachrichtEdited,
            lerngruppe, chatpartner, deleteButtonPressed, showErstelleLerngruppeDialog, showProfilPopUp} = this.state;

        return (
            <Container className={classes.root}>
                <Card className={classes.chatHeader}>
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
                                        {
                                            chatpartner.getName()
                                        }
                                        <Button onClick={this.popUpButtonClicked}>
                                            {
                                                chatpartner.getName()
                                            }
                                        </Button>  <br/>
                                        <Button disabled={deleteButtonPressed}
                                                color={"primary"}
                                                variant={"contained"}
                                                onClick={this.openErstelleLerngruppeDialog}>
                                            Gruppe erstellen
                                        </Button>
                                        <ErstelleLerngruppeDialog
                                            show={showErstelleLerngruppeDialog}
                                            person={this.props.currentPerson}
                                            chatpartner={chatpartner}
                                            onClose={this.erstelleLerngruppeDialogClosed}/>
                                        <Button disabled={deleteButtonPressed}
                                                color={"secondary"}
                                                variant={"contained"}
                                                onClick={this.deleteChatTeilnahme}>
                                                            Chat löschen
                                        </Button>
                                    </Typography>
                                </>
                                : null
                        }
                    </>
                </Card>

                {
                    this.chatAufruf()
                }

                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getNachrichten}
                />

                <TextField type='text'
                           id='neueNachricht'
                           value={neueNachricht}
                           onChange={this.textFieldValueChange}
                           error={neueNachrichtValidationFailed}>
                    Test
                </TextField> &nbsp;&nbsp;

                <Button color="primary"
                        variant='contained'
                        disabled={ !(neueNachrichtEdited && !neueNachrichtValidationFailed) }
                        onClick={this.addNachricht}>
                    Senden
                </Button>

                <PopUpProfil show={showProfilPopUp}
                             person={chatpartner}
                             onClose={this.popUpClosed} />
            </Container>
        )
    }
}


/** Component specific styles */
const styles = theme => ({
  root: {
      width: '100%',
      flexGrow: 1
  },
    chatHeader: {
      padding: '10px 20px 10px 20px'
    }
});

/** PropTypes */
NachrichtenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(NachrichtenList));