import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    TextField, Button
} from '@material-ui/core';
import NachrichtenList from "./NachrichtenList";
import StudooAPI from '../api/StudooAPI'
import {NachrichtBO} from "../api";

class KonversationListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            konversation: props.konversation,
            lerngruppe: null,     // falls die Konversation ein Gruppenchat ist, ist das die zugehörige Lerngruppe
            neueNachricht: null,
            neueNachrichtValidationFailed: false,
            neueNachrichtEdited: false,
            error: null,
            loadingInProgress: false,
            addingInProgress: false,
            addingError: null
        }
        this.baseState = this.state
    }

    getLerngruppe = () => {
        if (this.state.konversation.ist_gruppenchat){
            StudooAPI.getAPI().getLerngruppeOfKonversationID(this.state.konversation.getID())
                .then(lerngruppe => {
                    this.setState({
                        lerngruppe: lerngruppe,
                        error: null,
                        loadingInProgress: false
                    })
                }).catch(e => this.setState({
                lerngruppe: null,
                error: e,
                loadingInProgress: false
            }));

            this.setState({
                loadingInProgress: true,
                error: null
            });
        }
    }

    textFieldValueChange = (event) => {
        const value = event.target.value;

        let error = false;
        if (value.trim().length === 0) {
            error= true;
        }

        this.setState({
            [event.target.id]: event.target.value,
            [event.target.id + 'ValidationFailed']: error,
            [event.target.id + 'Edited']: true
        })
    }

    addNachricht = () => {
        let newNachricht = new NachrichtBO(this.state.neueNachricht, this.props.person.getID(),
            this.state.konversation.getID());
        console.log(newNachricht)
        console.log(new Date())
        StudooAPI.getAPI().addNachricht(newNachricht)
            .then(nachricht => {
                this.setState(this.baseState)
            }).catch(e =>
        this.setState({
            addingInProgress: false,
            addingError: e
        }));

        this.setState({
            addingInProgress: true,
            addingError: null
        })

    }

    componentDidMount() {
        this.getLerngruppe()
    }

    render() {
        const { classes } = this.props;
        const { konversation, lerngruppe, neueNachricht, neueNachrichtValidationFailed, neueNachrichtEdited } = this.state;

        return (
            <div>
                <Typography>
                        ----------------- <br/>
                        KonversationsID: {konversation.getID()} <br/>
                        Gruppenchat: {String(konversation.getIstGruppenchat())}<br/>
                    {
                        lerngruppe ?
                            <Typography>
                                Gruppenname: {lerngruppe.getGruppenname()}
                            </Typography>
                            : null
                    }
                        -----------------
                        <NachrichtenList
                            currentPerson={this.props.person}
                            konversation={konversation}
                        />
                    <br/>
                    <TextField type='text' id='neueNachricht' value={neueNachricht} onChange={this.textFieldValueChange}
                    error={neueNachrichtValidationFailed}>
                        Test
                    </TextField>&nbsp;&nbsp;
                    <Button variant='contained' disabled={ !neueNachrichtEdited }
                    onClick={this.addNachricht}>
                        Nachricht senden
                    </Button>
                    <br/>
                </Typography>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        width: '1ßß%',
    }
});

KonversationListEntry.propTypes = {
    konversation: PropTypes.object.isRequired,
}

export default withStyles(styles)(KonversationListEntry);
