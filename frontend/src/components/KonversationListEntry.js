import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Typography,
    Button,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar}
    from '@material-ui/core';
import StudooAPI from '../api/StudooAPI'
import "./components-theme.css";

/** Diese Component stellt einen Listeneintrag der Auflistung der aktuell existierenden Chats dar.
 * Diese Component wird in KonversationenList entsprechend der Anzahl an existierenden Chats aufgerufen. */

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

    /** Lädt das LerngruppenBO mit einer bestimmten KonversationID über die API aus dem Backend. */
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

    /** Lädt das PersonBO des Chatpartners mit einer bestimmten KonversationID über die API aus dem Backend. */
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

    /** Die Lifecycle Methode, welche bei Aufruf für die Einfügung der Component in den DOM sorgt. */
    componentDidMount() {
        this.getLerngruppe()
        this.getChatpartner()
    }

    /** Rendert die Component. */
    render() {
        const { classes } = this.props;
        const { konversation, lerngruppe, chatpartner } = this.state;

        return (
            <Container>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Wir brauchen noch Bilder" src="/components/chat/dummy_avatar.png"/>
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
                                                {chatpartner.getName()}
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
            </Container>
        )
    }
}

/** PropTypes */
KonversationListEntry.propTypes = {
    konversation: PropTypes.object.isRequired,
}

export default KonversationListEntry;