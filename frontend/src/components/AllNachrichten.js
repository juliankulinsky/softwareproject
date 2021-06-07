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
import TestListEntry from "./TestListEntry";
import NachrichtEntry from "./NachrichtEntry";

class AllNachrichten extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inhalt: "",
            error: null,
            loadingInProgress: false
        }
    }

    getNachrichten = () => {
        StudooAPI.getAPI().getNachrichten()
        .then(nachrichtenBOs => {
            this.setState({
                nachrichten: nachrichtenBOs,
                error: null,
                loadingInProgress: false
            });
            console.log(this.state.nachrichten)
        }).catch(e => this.setState({
            personen: "No person received.",
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
        console.log("ich bin in render und nachrichten ist " + typeof(nachrichten))
        console.log(nachrichten)
        return (
            <div className={classes.root} >
                <Grid>
                    <Grid item>
                        <Typography>
                            Test 1.0.0
                        </Typography>
                    </Grid>
                </Grid>
                Ich wurde zumindest bis hierhin geladen.

                Jetzt kommen Nachrichten:

                {
                    nachrichten.map(nachricht =>
                    <NachrichtEntry
                        key={nachricht.getID()}
                        nachricht={nachricht}
                    />)
                }
                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getNachrichten}
                />
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
AllNachrichten.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(AllNachrichten));