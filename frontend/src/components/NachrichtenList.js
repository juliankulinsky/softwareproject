import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Container,
    Card,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Grid,
    Typography,
    CardContent
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import NachrichtListEntry from "./NachrichtListEntry";
import {NachrichtBO} from "../api";

class NachrichtenList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            konversation: props.konversation,
            nachrichten: [],
            person: props.person,
            neueNachricht: null,
            neueNachrichtValidationFailed: false,
            neueNachrichtEdited: false,
            error: null,
            loadingInProgress: false
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
        let newNachricht = new NachrichtBO(this.state.neueNachricht, this.props.currentPerson.getID(),
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
        this.getNachrichten();
    }

    Anzeige = () => {
        let nachrichten = this.state.nachrichten

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


    render() {
        const {classes} = this.props;
        const {nachrichten=[], error, loadingInProgress, neueNachricht, neueNachrichtValidationFailed,
            neueNachrichtEdited} = this.state;
        return (
            <Container className={classes.root}>
                {
                    this.Anzeige()
                }

                <LoadingProgress show={loadingInProgress} />
                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getNachrichten}
                />

                <TextField type='text' id='neueNachricht' value={neueNachricht} onChange={this.textFieldValueChange}
                                    error={neueNachrichtValidationFailed}>
                                        Test
                                    </TextField> &nbsp;&nbsp;

                                    <Button color="primary" variant='contained' disabled={ !(neueNachrichtEdited && !neueNachrichtValidationFailed) }
                                    onClick={this.addNachricht}>
                                        Senden
                                    </Button>

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
  personFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
NachrichtenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(NachrichtenList));