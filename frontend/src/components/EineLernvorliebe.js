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
    ButtonGroup
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import LernvorliebenListEntry from "./LernvorliebenListEntry";
import ProfilForm from "./dialogs/ProfilForm";
import PersonEntry from "./PersonEntry";


/** Displays a single Lernvorliebe of the current Person on the 'Your Profile' Tab */
class EineLernvorliebe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lernvorliebe: null,
            person: props.person,
            error: null,
            loadingInProgress: false
        };
    }

    getLernvorliebe = () => {
        StudooAPI.getAPI().getLernvorliebe(this.props.lvId)
            .then(lernvorliebeBO => {
                this.setState({
                    lernvorliebe: lernvorliebeBO,
                    error: null,
                    loadingInProgress: false
                });
            }).catch(e => this.setState({
            personen: ["wtf"],
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    /** Handles the onClick event of the edit person button */
    editProfilButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showProfilForm: true
        });
    }

    /** Handles the onClose event of the ProfilForm */
    profilFormClosed = (person) => {
        // customer is not null and therefor changed
        if (person) {
            this.setState({
                person: person,
                showProfilForm: false
            });
        } else {
            this.setState({
                showProfilForm: false
            });
        }
    }

    componentDidMount() {
        this.getLernvorliebe();
    }

    render() {
        const {classes} = this.props;
        const {lernvorliebe, person, error, showProfilForm, loadingInProgress} = this.state;

        return (
            <div className={classes.root}>
                <Grid>
                    <Grid item>
                    </Grid>
                </Grid>
                {
                    person ?
                        lernvorliebe ?
                            <PersonEntry person={person} lernvorliebe={lernvorliebe}/>
                        : null
                        :null
                }
                {
                    lernvorliebe ?
                        <LernvorliebenListEntry lernvorliebe={lernvorliebe}/>
                        : null
                }
                <LoadingProgress show={loadingInProgress}/>
                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getLernvorlieben}
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
EineLernvorliebe.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(EineLernvorliebe));