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
import AktProfilEntry from "./AktProfilEntry";
import PersonEntry from "./PersonEntry";
import EineLernvorliebe from "./EineLernvorliebe";


/**
 * Gets the currently logged in Person and displays information of PersonBO and LernvorliebenBO
 * */
class AktuellesProfil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profil: null,
            person: props.person,
            error: null,
            loadingInProgress: false
        }
    }

    /**
     * API call get the Profil of the current Person by the ProfilId stored in the PersonBO
     * */
    getProfil = () => {
        StudooAPI.getAPI().getProfil(this.props.person.getProfilId())
        .then(profilBO => {
            this.setState({
                profil: profilBO,
                error: null,
                loadingInProgress: false
            });
        }).catch(e => this.setState({
            profil: "No profil received.",
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    /** Lifecycle Method which is called when the component is rendered on DOM */
    componentDidMount() {
    this.getProfil();
    }


    render() {
        const {classes, selfperson} = this.props;
        const {profil, person, error, loadingInProgress} = this.state;
        return (
            <div>
                {/*
                    person ?
                        <PersonEntry person={person}/>
                    : null*/
                }
                {
                    profil ?
                        <EineLernvorliebe lvId={profil.getLernvorliebeID()} person={person} profil={profil} selfperson={selfperson} />
                    : null
                }
                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getProfile}
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
AktuellesProfil.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(AktuellesProfil));