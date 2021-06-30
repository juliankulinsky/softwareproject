import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Card, CardContent, Button} from '@material-ui/core';
import {GruppenVorschlagBO, StudooAPI} from "../api";
import "./components-theme.css";

/**
 * Rendert eine ausgehende Gruppenbeitrittsanfrage mit der Option, diese zurückzuziehen.
 * Es handelt sich um ein spezifisches GruppenVorschlagBO-Objekt, das als Props übergeben wurde,
 * welches durch den "Zurückziehen"-Button bearbeitet werden kann.
 */
class AusgehendeGruppenbeitrittsAnfragenListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anfrage: this.props.anfrage,
            lerngruppe: null,
            matchpoints: this.props.anfrage.getMatchpoints(),
            buttonPressed: false
        }
    }

    /** Lädt das LerngruppeBO des übergebenen GruppenVorschlags aus dem Backend */
    getLerngruppe = () => {
        StudooAPI.getAPI().getLerngruppe(this.state.anfrage.getGruppenID())
            .then(lerngruppe => {
                this.setState({
                    lerngruppe: lerngruppe
                })
            })
    }

    /**
     * Updaten des GruppenVorschlagBO ausgelöst durch den "Zurückziehen"-Button, wobei die Matchpoints um 1 niedriger
     * gesetzt werden, was bedeutet, dass die ausgehende GruppenBeitrittsAnfrage zurückgezogen wird.
     */
    updateGruppenvorschlagsAnfrage = () => {
        this.setState({
            buttonPressed: true
        })
        let updatedGruppenVorschlag = Object.assign(new GruppenVorschlagBO(), this.state.anfrage);
        updatedGruppenVorschlag.setMatchpoints(this.state.matchpoints -= 1)
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
     * Die Lifecycle Methode, welche bei Aufruf für die Einfügung der Component in den DOM sorgt.
     * Ruft die Methode auf, welche die Daten aus dem Backend lädt.
     */
    componentDidMount() {
        this.getLerngruppe()
    }

    /** Rendert die Komponente */
    render() {
        const {classes} = this.props;
        const {anfrage, lerngruppe, buttonPressed} = this.state;

        return (
            <>
                {
                    (anfrage && lerngruppe) ?
                        <Card className="anfragencard">
                            <CardContent>

                                <Typography variant="h6">
                                    Du möchtest der Gruppe "{lerngruppe.getGruppenname()}" beitreten!
                                </Typography>

                                <br/>

                                <div className="buttonAlign">
                                    <Button disabled={buttonPressed} variant={"contained"} color={"secondary"}
                                            onClick={this.updateGruppenvorschlagsAnfrage}>
                                        Zurückziehen
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        :
                        null
                }
            </>
        )
    }
}

/** Komponent-spezifische Styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
});

/** PropTypes */
AusgehendeGruppenbeitrittsAnfragenListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(AusgehendeGruppenbeitrittsAnfragenListEntry);