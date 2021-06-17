import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import {StudooAPI} from "../api";
import LoadingProgress from "./dialogs/LoadingProgress";
import ContextErrorMessage from "./dialogs/ContextErrorMessage";
//import AccountList from './AccountList';


class NachrichtListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nachricht: props.nachricht,
            absenderPerson: null,
            currentPerson: props.currentPerson,
            error: null,
            loadingInProgress: false
        }
    }

    getAbsenderPerson = () => {
        StudooAPI.getAPI().getPerson(this.props.nachricht.getAbsenderID())
            .then(absenderPerson => {
                this.setState({
                    absenderPerson: absenderPerson,
                    error: null,
                    loadingInProgress: false
                })
            }).catch(e => this.setState({
            absenderPerson: null,
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    deleteNachricht = () => {
        StudooAPI.getAPI().deleteNachricht(this.state.nachricht.getID())
    }

    EigeneNachricht = () => {
        return <Typography className={this.props.classes.right}>
                    Nachricht #{this.state.nachricht.getID()}:&nbsp;
                    {
                        this.state.nachricht.getInhalt()
                    }
                    <div>
                        &nbsp;&nbsp;&nbsp;AbsenderID: {this.state.nachricht.getAbsenderID()} &nbsp;
                        von dir
                    </div>
                    <Button color="secondary" onClick={this.deleteNachricht} variant={"contained"} >
                        Löschen
                    </Button>
               </Typography>
    }

    FremdeNachricht = () => {
        return <Typography className={this.props.classes.left}>
                    Nachricht #{this.state.nachricht.getID()}:&nbsp;
                    {
                        this.state.nachricht.getInhalt()
                    }
                    <div>
                        &nbsp;&nbsp;&nbsp;AbsenderID: {this.state.nachricht.getAbsenderID()}&nbsp;
                        von {this.state.absenderPerson.getName()}
                    </div>
               </Typography>
    }

    Anzeige = () => {
        if (this.state.currentPerson.getID()===this.state.absenderPerson.getID()){
            return this.EigeneNachricht()
        }
        else {
            return this.FremdeNachricht()
        }
    }

    componentDidMount() {
        this.getAbsenderPerson()
    }

    render() {
        const { classes } = this.props;
        const { nachricht, absenderPerson, currentPerson, error, loadingInProgress } = this.state;

        return (
            <div>
                <Typography className={classes.root}>
                    {
                        absenderPerson ?
                        this.Anzeige()
                            : null
                    }
                </Typography>
                <LoadingProgress show={loadingInProgress} />
                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getAbsenderPerson}
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
    right: {
      textAlign: "right"
    },
    left: {
      textAlign: "left"
    }
});

/** PropTypes */
NachrichtListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  nachricht: PropTypes.object.isRequired,

}

export default withStyles(styles)(NachrichtListEntry);