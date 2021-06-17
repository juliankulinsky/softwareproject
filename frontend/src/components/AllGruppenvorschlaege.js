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
import GruppenvorschlaegeEntry from "./GruppenvorschlaegeEntry";

class AllGruppenvorschlaege extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gruppenvorschlaege: [],
            error: null,
            loadingInProgress: false
        }
    }

    getGruppenvorschlaege = () => {
        StudooAPI.getAPI().getGruppenVorschlaege()
        .then(gruppenvorschlaegeBOs => {
            this.setState({
                gruppenvorschlaege: gruppenvorschlaegeBOs,
                error: null,
                loadingInProgress: false
            });
            console.log(this.state.gruppenvorschlaege)

        }).catch(e => this.setState({
            gruppenvorschlaege: [],
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    componentDidMount() {
    this.getGruppenvorschlaege();
    }


    render() {
        const {classes} = this.props;
        const {gruppenvorschlaege=[], error, loadingInProgress} = this.state;

        return (
            <div className={classes.root} >
                <Typography>
                    Das sind alle Gruppenvorschläge:
                </Typography>

                {
                    gruppenvorschlaege.map(gruppenvorschlag =>
                    <GruppenvorschlaegeEntry
                        key={gruppenvorschlag.getID()}
                        gruppenvorschlag={gruppenvorschlag}
                    />)
                }
                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getGruppenvorschlaege}
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
AllGruppenvorschlaege.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(AllGruppenvorschlaege));