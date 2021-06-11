import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Grid,
    Typography,
    Card,
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
        console.log(this.props.konversation)
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


    render() {
        const {classes} = this.props;
        const {nachrichten=[], error, loadingInProgress} = this.state;
        return (
            <div className={classes.root} >
                <Grid>
                    <Grid item>
                        <Typography>
                            Test 1.0.0
                        </Typography>
                    </Grid>
                </Grid>
                <div>
                    nachrichten ?
                        Ich wurde zumindest bis hierhin geladen.

                        Jetzt kommen Nachrichten:

                        {
                            nachrichten.map(nachricht =>
                            <NachrichtListEntry
                                key={nachricht.getID()}
                                nachricht={nachricht}
                                currentPerson={this.props.currentPerson}
                            />)
                        }
                        <ContextErrorMessage
                            error={error} contextErrorMsg={`Nicht geklappt`}
                            onReload={this.getNachrichten}
                        />
                    :
                    Keine Nachrichten
                </div>

            </div>
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