import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Container,
    Grid,
    Button,
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
 * Gerendert werden hier eingefasst auf der linken Seite eine Auflistung aller aktuell bestehenden Chats.
 * Auf der rechten Seite befindeen sich, nach anklicken eines Chats, die entsprechenden Nachrichten der Konversation.
 * Es kann zwischen Konversationen gewechselt werden, Nachrichten geschrieben und empfangen werden.
 * Zudem ist die Erstellung von Gruppen aus Einzelchats heraus möglich. */


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
            loadingInProgress: true,
            error: null
        })
    }

    setAktuelleKonversation = (konversation) => {
        this.setState({
            aktuellekonversation: null
        })
        this.setState({
            aktuellekonversation: konversation
        })
    }

    componentDidMount() {
        this.getKonversationen();
    }

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