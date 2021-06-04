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
import TestListEntry from "./TestListEntry";


class LernvorliebenList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lernvorlieben: [],
            error: null,
            loadingInProgress: false
        };
    }

    getLernvorlieben = () => {
        StudooAPI.getAPI().getLernvorlieben()
            .then(lernvorliebeBOs => {
                this.setState({
                    lernvorlieben: lernvorliebeBOs,
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
        this.getLernvorlieben();
    }

    render() {
        const { classes } = this.props;
        const { lernvorlieben, error, loadingInProgress } = this.state;

        return (
            <div>
                <Grid>
                    <Grid item>
                        <Typography>
                            Lernvorliebe Test
                        </Typography>
                    </Grid>
                </Grid>
                Lernvorlieben2:

                {
                    lernvorlieben.map(lernvorliebe =>
                    <TestListEntry>
                        key={lernvorliebe.getID()}
                        lernvorliebe={lernvorliebe}
                    </TestListEntry>)
                }
                <LoadingProgress>
                    show={loadingInProgress}
                </LoadingProgress>
                <ContextErrorMessage>
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getLernvorlieben}
                </ContextErrorMessage>
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
LernvorliebenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(LernvorliebenList));