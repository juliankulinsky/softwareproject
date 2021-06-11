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

class AktuellesProfil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profil: null,
            error: null,
            loadingInProgress: false
        }
    }

    getProfil = () => {
        StudooAPI.getAPI().getProfil(this.props.person.getID())
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

    componentDidMount() {
    this.getProfil();
    }


    render() {
        const {classes} = this.props;
        const {profil,  error, loadingInProgress} = this.state;
        return (
            <div className={classes.root} >
                <Grid>
                    <Grid item>
                    </Grid>
                </Grid>
                {
                    profil ?
                        <AktProfilEntry
                            key={profil.getID()}profil={profil}
                        />
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