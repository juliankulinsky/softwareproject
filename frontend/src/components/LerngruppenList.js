import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
//import { StudooAPI } from '../api';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import PersonForm from './dialogs/PersonForm';
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
        StudooAPI.getAPI().getLerngruppenForPersonID(this.props.person.getID())
            .then(lerngruppenBOs => {
                this.setState({
                    lerngruppen: lerngruppenBOs,
                    error: null,
                    loadingInProgress: false
                });
            }).catch(e => this.setState({
            lerngruppen: [],
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
                <Typography>
                    Das sind die Lerngruppen von &nbsp;
                    {
                        this.props.person.getName()
                    }
                   :
                </Typography>

                {
                    lerngruppen.map(lerngruppe =>
                    <LerngruppeListEntry
                        key={lerngruppe.getID()}
                        lerngruppe={lerngruppe}
                        currentperson={this.props.person}
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
});

/** PropTypes */
LerngruppenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(LerngruppenList));
