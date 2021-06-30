import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Grid,
    Card,
    Typography,
    ButtonBase}
    from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import KonversationListEntry from "./KonversationListEntry";
import NachrichtenList from "./NachrichtenList";
import "./components-theme.css";

/** Diese Component stellt die höchste Hierarchie-Stufe der Chat-Funktion von Studoo dar.
 * Gerendert werden hier, eingefasst auf der linken Seite, eine Auflistung aller aktuell existierenden Chats.
 * Auf der rechten Seite befinden sich, nach anklicken einer Lerngruppe/Lernpartner,
 * die entsprechenden Nachrichten der Konversation.
 * Es kann zwischen Konversationen gewechselt werden, Nachrichten geschrieben und empfangen werden.
 * Zudem ist die Erstellung von Gruppen aus Einzelchats mit Lernpartnern heraus möglich. */

class KonversationenList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            konversationen: [],
            person: props.person,
            konversation: null,
            aktuellekonversation: null,
            error: null,
            loadingInProgress: false
        };
    }

    /** Lädt alle KonversationBOs einer bestimmten PersonID über die API aus dem Backend. */
    getKonversationen = () => {
        StudooAPI.getAPI().getKonversationenForPersonID(this.props.person.getID())
            .then(konversationenBOs => {
                this.setState({
                    konversationen: konversationenBOs,
                    error: null,
                    loadingInProgress: false
                });
            }).catch(e => this.setState({
            konversationen: [],
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            //loadingInProgress: true,
            error: null
        })
    }

    /** Setzt nach Klick auf eine jeweilige Konversation die aktuelle Konversation in den State. */
    setAktuelleKonversation = (konversation) => {
        this.setState({
            aktuellekonversation: null
        })
        this.setState({
            aktuellekonversation: konversation
        })
    }

    /** Die Lifecycle Methode, welche bei Aufruf für die Einfügung der Component in den DOM sorgt. */
    componentDidMount() {
        this.getKonversationen();
        this.interval = setInterval(() => this.getKonversationen(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /** Methode, welche die links gelegene Auflistung der aktiven Konversationen ausgibt. */
    Chats = () => {
        const konversationen = this.state.konversationen

        if (konversationen.length === 0) {
            return <Typography>Du nimmst an keinen Konversationen teil.</Typography>

        } else return konversationen.map(konversation =>
            <Card>
                <ButtonBase
                    onClick={() => this.setAktuelleKonversation(konversation)}>
                    <KonversationListEntry
                        key={konversation.getID()}
                        konversation={konversation}
                        person={this.props.person}
                    />
                </ButtonBase>
            </Card>)
    }

    /** Rendert die Component. */
    render() {
        const {classes, person} = this.props;
        const {konversationen, aktuellekonversation, error, loadingInProgress} = this.state;

        return (
            <Box className="root">
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                    {
                        this.Chats()
                    }
                    <LoadingProgress show={loadingInProgress}/>
                    <ContextErrorMessage
                        error={error} contextErrorMsg={`Nicht geklappt`}
                        onReload={this.getKonversationen}
                    />
                    </Grid>
                    <Grid item xs>
                        {
                            aktuellekonversation ?
                                <Card className="chatCard">
                                    {/*KonversationsID: {konversation.getID()}*/}

                                    <NachrichtenList
                                        key={aktuellekonversation.getID()}
                                        konversation={aktuellekonversation}
                                        currentPerson={person}
                                    />
                                </Card>
                                :
                                <Typography className="noConversations">
                                    Du hast noch <b>keine</b> Konversation ausgewählt.
                                </Typography>
                        }
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

/** PropTypes */
KonversationenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(KonversationenList);