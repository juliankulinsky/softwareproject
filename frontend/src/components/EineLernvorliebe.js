import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import LernvorliebenListEntry from "./LernvorliebenListEntry";



class EineLernvorliebe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lernvorliebe: null,
            error: null,
            loadingInProgress: false
        };
    }

    getLernvorliebe = () => {
        StudooAPI.getAPI().getLernvorliebe(this.props.tes)
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

    componentDidMount() {
        this.getLernvorliebe();
    }

    render() {
        const {classes} = this.props;
        const {lernvorliebe, error, loadingInProgress} = this.state;

        return (
            <div className={classes.root}>
                <Grid>
                    <Grid item>
                    </Grid>
                </Grid>
                Lernvorliebe:

                {
                    /*lernvorlieben.map(lernvorliebe =>*/
                    lernvorliebe ?
                        <LernvorliebenListEntry key={lernvorliebe.getID()} lernvorliebe={lernvorliebe}
                        />
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