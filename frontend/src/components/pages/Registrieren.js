import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, withRouter} from 'react-router-dom';
import {Container, ThemeProvider, CssBaseline, Typography, IconButton, Avatar, Button, withStyles} from '@material-ui/core';
import firebase from 'firebase/app';
import AktuellesProfil from "../AktuellesProfil";
import ProfilVorschau from "../ProfilVorschau";
import 'firebase/auth';
import LoadingProgress from "../dialogs/LoadingProgress";
import ContextErrorMessage from "../dialogs/ContextErrorMessage";
import PropTypes from 'prop-types';


class Registrieren extends Component {

    constructor(props) {
        super(props);

        this.state = {
            person: props.person,
            error: null,
            loadingInProgress: false
        }
    }

    goToAppjs = () => {
        window.location.href = 'http://localhost:3000'
    }


    render() {
        const {classes, user} = this.props;
        const {person, loadingInProgress, error} = this.state;

        return (
            <div className={classes.root}>
                {
                    person ?
                        <>
                            <ProfilVorschau person={person} user={user}/>
                            <AktuellesProfil person={person} user={user}/>
                            <Button id="myButton" variant={"contained"} onClick={this.goToAppjs}>Registrieren</Button>
                        </>
                        :
                        null
                }
                <LoadingProgress show={loadingInProgress}/>
                <ContextErrorMessage error={error} contextErrorMsg={`The list of personen could not be loaded.`}
                                     onReload={this.getPerson}/>
            </div>
        );
    }
}
/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

Registrieren.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Registrieren));



