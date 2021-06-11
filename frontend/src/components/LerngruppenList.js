import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
//import { StudooAPI } from '../api';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import PersonForm from './dialogs/PersonForm';
import PersonListEntry from './PersonListEntry';
import LerngruppeListEntry from "./LerngruppeListEntry";


class LerngruppenList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lerngruppen: [],
            error: null,
            loadingInProgress: false
        };
    }

    getLerngruppen = () => {
        StudooAPI.getAPI().getLerngruppen()
            .then(lerngruppeBOs => {
                this.setState({
                    lerngruppen: lerngruppeBOs,
                    error: null,
                    loadingInProgress: false
                });
            }).catch(e => this.setState({
            personen: [],
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    componentDidMount() {
        this.getLerngruppen();
    }

    render() {
        const { classes } = this.props;
        const { lerngruppen, error, loadingInProgress } = this.state;

        return (
            <div className={classes.root}>
                <Grid>
                    <Grid item>
                        <Typography>
                            Test test
                        </Typography>
                    </Grid>
                </Grid>
                Lerngruppen:

                {
                    lerngruppen.map(lerngruppe =>
                    <LerngruppeListEntry
                        key={lerngruppe.getID()}
                        lerngruppe={lerngruppe}
                    />)
                }
                <LoadingProgress show={loadingInProgress} />
                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getLerngruppen}
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
LerngruppenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(LerngruppenList));
