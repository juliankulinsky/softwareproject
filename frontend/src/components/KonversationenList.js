import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Box,
    Container,
    Grid,
    ListItem,
    Button,
    Card,
    TextField,
    InputAdornment,
    IconButton,
    Typography,
    ButtonBase
}
    from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import KonversationListEntry from "./KonversationListEntry";
import NachrichtenList from "./NachrichtenList";
import "./components-theme.css";
import {NachrichtBO} from "../api";

class KonversationenList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            konversationen: [],
            aktuellekonversation: null,
            neueNachricht: null,
            neueNachrichtValidationFailed: false,
            neueNachrichtEdited: false,
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
            aktuellekonversation: konversation
        })
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

    componentDidMount() {
        this.getKonversationen();
    }

    Chats = () => {
        let konversationen = this.state.konversationen


        if (konversationen.length === 0) {
            return <Typography>Du nimmst an keinen Konversationen teil.</Typography>
        } else return konversationen.map(konversation =>
            <Card>
                <ButtonBase
                    onClick={(event) => this.setAktuelleKonversation(konversation)}>

                    <KonversationListEntry
                        key={konversation.getID()}
                        konversation={konversation}
                        person={this.props.person}
                    />

                </ButtonBase>
            </Card>)
    }

    render() {
        const {classes} = this.props;
        const {konversationen, aktuellekonversation, neueNachricht, neueNachrichtValidationFailed,
            neueNachrichtEdited, error, loadingInProgress} = this.state;

        return (
            <Box className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                    {
                        this.Chats()
                    }

                    <LoadingProgress show={loadingInProgress}/>

                    <ContextErrorMessage
                        error={error} contextErrorMsg={`Nicht geklappt`}
                        onReload={this.getKonversationen}
                    />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {
                            aktuellekonversation ?
                                <>
                                <NachrichtenList
                                    konversation={aktuellekonversation}
                                    currentPerson={this.props.person}
                                />

                                <TextField type='text' id='neueNachricht' value={neueNachricht} onChange={this.textFieldValueChange}
                                error={neueNachrichtValidationFailed}>
                                    Test
                                </TextField> &nbsp;&nbsp;

                                <Button color="primary" variant='contained' disabled={ !(neueNachrichtEdited && !neueNachrichtValidationFailed) }
                                onClick={this.addNachricht}>
                                    Nachricht senden
                                </Button>
                                </>

                                :
                                <Typography>
                                    Du hast noch <b>keine</b> Konversation ausgewählt.
                                </Typography>
                        }

                        {/*<Typography>
                        <b>KonversationsID: {konversation.getID()}</b> <br/><br/>

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
                      </Typography>*/}

                    </Grid>
                </Grid>
            </Box>
        )
    }
}

const styles = theme => ({
  root: {
    width: '100%',
  },
});

/** PropTypes */
KonversationenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(KonversationenList));