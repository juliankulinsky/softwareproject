import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Box, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import {GruppenVorschlagBO, StudooAPI} from "../api";
import "./components-theme.css"


class GruppenAnfragenListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anfrage: this.props.anfrage,
            lerngruppe: this.props.lerngruppe,
            anfragendePerson: null,
            matchpoints: this.props.anfrage.getMatchpoints(),
            entscheidung: null,
            buttonPressed: false
        }
    }

    /**
     * Die Gruppenanfrage annehmen
     */
    entscheidungTrue = () => {
        this.setState({
            entscheidung: true,
            buttonPressed: true
        }, function () {
            this.updateGruppenvorschlagsAnfrage()
        });
    }

    /**
     * Die Gruppenanfrage ablehnen
     */
    entscheidungFalse = () => {
        this.setState({
            entscheidung: false,
            buttonPressed: true
        }, function () {
            this.updateGruppenvorschlagsAnfrage()
        });
    }

    /**
     * Nach einer Entscheidung wird die Gruppenanfrage intern bearbeitet (db).
     * Hierzu werden die Matchpoints erhöht und der State neu gesetzt.
     */
    updateGruppenvorschlagsAnfrage = () => {
        let updatedGruppenVorschlag = Object.assign(new GruppenVorschlagBO(), this.state.anfrage);
        updatedGruppenVorschlag.setEntscheidungGruppe(true)
        if (this.state.entscheidung) {
            updatedGruppenVorschlag.setMatchpoints(this.state.matchpoints += 1)
        }
        StudooAPI.getAPI().updateGruppenVorschlag(updatedGruppenVorschlag)
            .then(gruppenVorschlag => {
                this.setState({
                    updatingInProgress: false,
                    updatingError: null
                });
                this.baseState.entscheidung = this.state.entscheidung;
            }).catch(e =>
            this.setState({
                updatingInProgress: false,
                updatingError: e
            }));
        this.setState({
            updatingInProgress: true,
            updatingError: null
        })
    }

    /**
     * Anfragende Person auslesen
     */
    getAnfragendePerson = () => {
        StudooAPI.getAPI().getPerson(this.state.anfrage.getPersonID())
            .then(anfragendePerson => {
                this.setState({
                        anfragendePerson: anfragendePerson
                    }
                )
            })
    }

    componentDidMount() {
        this.getAnfragendePerson()
    }

    render() {
        const {classes} = this.props;
        const {anfrage, buttonPressed, anfragendePerson} = this.state;

        return (
            <>
                {
                    (anfrage && anfragendePerson) ?
                        <div className="anfrageRequest">
                            <Typography style={{display: 'flex', alignItems: 'center'}}>
                                {anfragendePerson.getName()}
                            </Typography>

                            <Button disabled={buttonPressed} color={"primary"}
                                    onClick={this.entscheidungTrue}>
                                Annehmen
                            </Button>

                            <Button disabled={buttonPressed} color={"secondary"}
                                    onClick={this.entscheidungFalse}>
                                Ablehnen
                            </Button>
                        </div>
                        :
                        null
                }
            </>
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
GruppenAnfragenListEntry.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GruppenAnfragenListEntry);