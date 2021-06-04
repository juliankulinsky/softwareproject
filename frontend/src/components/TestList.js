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
import TestListEntry from "./TestListEntry";


class TestList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lerngruppen: [],
            error: null,
            loadingInProgress: false
        };
    }

    getLerngruppen = () => {
        /**
    var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch("http://127.0.0.1:5000/studoo/lerngruppen", requestOptions)
          .then(response => response.json())
          .then(result => this.setState({               // Set new state when CustomerBOs have been fetched
            lerngruppen: result,
            loadingInProgress: false,   // disable loading indicator
            error: null
        }))
          .catch(error => console.log('error', error));
    console.log(this.personen)
    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
         */
        console.log(StudooAPI.getAPI().getLerngruppen())
        StudooAPI.getAPI().getLerngruppen()
            .then(lerngruppeBOs => {
                this.setState({
                    lerngruppen: lerngruppeBOs,
                    error: null,
                    loadingInProgress: false
                });
                console.log("fast geschafft");
                console.log(lerngruppeBOs)
            }).catch(e => this.setState({
            personen: ["wtf"],
            error: e,
            loadingInProgress: false
        }));

        console.log(this.state.lerngruppen)
        console.log("yo")

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
                    <TestListEntry
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
TestList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(TestList));