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

class NachrichtenList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            konversation: props.konversation,
            nachrichten: [],
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
        const {nachrichten=[], error, loadingInProgress} = this.state;
        return (
            <Container className={classes.root}>
                <Card>
                    {
                        this.Anzeige()
                    }
                    <LoadingProgress show={loadingInProgress} />
                    <ContextErrorMessage
                        error={error} contextErrorMsg={`Nicht geklappt`}
                        onReload={this.getNachrichten}
                    />
                </Card>
            </Container>
        )
    }
}


/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
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