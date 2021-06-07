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
import ProfilEntry from "./ProfilEntry";

class AllProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inhalt: "",
            error: null,
            loadingInProgress: false
        }
    }

    getProfile = () => {
        StudooAPI.getAPI().getProfile()
        .then(profilBOs => {
            this.setState({
                profile: profilBOs,
                error: null,
                loadingInProgress: false
            });
            console.log(this.state.profile)
        }).catch(e => this.setState({
            profile: "No profil received.",
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    componentDidMount() {
    this.getProfile();
    }


    render() {
        const {classes} = this.props;
        const {profile=[], error, loadingInProgress} = this.state;
        console.log("ich bin in render und profile ist " + typeof(profile))
        console.log(profile)
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

                Jetzt kommen Profile:

                {
                    profile.map(profil =>
                    <ProfilEntry
                        key={profil.getID()}
                        profil={profil}
                    />)
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
AllProfile.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(AllProfile));