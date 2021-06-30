import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Button,
    Typography,
    Card,
    CardContent,
    Fab
} from '@material-ui/core';
import {NavLink, withRouter} from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import { GruppenVorschlagBO } from "../api";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./components-theme.css";
import Delayed from "./Delay";
import CircularProgress from "@material-ui/core/CircularProgress";
import GruppenProfilVorschau from "./GruppenProfilVorschau";

/**
 * Rendert den am besten zur aktuellen Person passenden GruppenVorschlagBO mit Anzeigen von Informationen über die
 * vorgeschlagene Gruppe. Zusätzlich besteht die Möglichkeit, diesen Vorschlag über zwei Button entweder anzunehmen,
 * wodurch der GruppenVorschlagBO aktualisiert wird. In beiden Fällen wird die EntscheidungPerson auf
 * true gesetzt.
 * Bei Annehmen werden die Matchpoints um 1 erhöht und bei Ablehnen werden die Matchpoints nicht verändert
 */
class LerngruppenExplorer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gruppenvorschlag: null,
            currentPerson: this.props.person,
            lerngruppe: null,
            entscheidung: null,
            matchpoints: 0,
            error: null,
            loadingInProgress: false,
            updatingInProgress: false,
            updatingError: null,
            buttonPressed: false
        }
        this.baseState = this.state;
    }

    /** Lädt das LerngruppeBO des GruppenVorschlags aus dem Backend */
    getLerngruppe = () => {
        StudooAPI.getAPI().getLerngruppe(this.state.gruppenvorschlag.getGruppenID())
            .then(lerngruppe => {
                this.setState({
                    lerngruppe: lerngruppe
                })
            })
    }

    /**
     * Auslesen des GruppenVorschlagBO mit der höchsten Ähnlichkeit, an der die aktuelle Person teilnimmt, bei dem
     * die aktuelle Person noch keine Entscheidung getroffen hat.
     */
    getBestGruppenvorschlag = () => {
        StudooAPI.getAPI().getGruppenVorschlagForPersonID(this.props.person.getID())
            .then(gruppenvorschlagBO => {
                this.setState({
                    gruppenvorschlag: gruppenvorschlagBO,
                    error: null,
                    loadingInProgress: false
                });
                if (this.state.gruppenvorschlag != null) {
                    this.setState({
                        matchpoints: gruppenvorschlagBO.getMatchpoints()
                    })
                    this.getLerngruppe()
                }
            }).catch(e => this.setState({
            gruppenvorschlag: null,
            matchpoints: 0,
            error: e,
            loadingInProgress: false
        }));

        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    /** Wird durch grünen Button aufgerufen, setzt die Entscheidung auf true und ruft die Update-Funktion auf */
    entscheidungTrue = () => {
        this.setState({
            entscheidung: true,
            buttonPressed: true
        }, function () {
            this.updateGruppenvorschlag()
        });
        setTimeout(this.refreshPage, 100)
    }

    /** Wird durch "Ablehnen"-Button aufgerufen, setzt die Entscheidung auf false und ruft die Update-Funktion auf */
    entscheidungFalse = () => {
        this.setState({
            entscheidung: false,
            buttonPressed: true
        }, function () {
            this.updateGruppenvorschlag()
        });
        setTimeout(this.refreshPage, 100)
    }

    refreshPage = () => {
        window.location.reload()
    }

    /**
     * Updaten des GruppenVorschlagBO, wobei die Matchpoints abhängig von der Entscheidung um 1 höher gesetzt werden
     * oder so bleiben. Die Entscheidung der Person wird auf true gesetzt, was bedeutet, dass eine Entscheidung
     * getroffen wurde.
     */
    updateGruppenvorschlag = () => {
        let updatedGruppenVorschlag = Object.assign(new GruppenVorschlagBO(), this.state.gruppenvorschlag);
        updatedGruppenVorschlag.setEntscheidungPerson(true);
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
            gruppenvorschlag: null,
            updatingInProgress: true,
            updatingError: null,
            buttonPressed: false
        })
    }

    /**
     * Lifecycle Methode, which is called when the component gets inserted into the browsers DOM.
     * Ruft die Methode auf, welche die Daten aus dem Backend lädt.
     */
    componentDidMount() {
        this.getBestGruppenvorschlag();
    }

    /** Rendert die Komponente */
    render() {
        const {classes} = this.props;
        const {gruppenvorschlag, lerngruppe, error, loadingInProgress} = this.state;

        return (
            <div className={classes.root}>
                <div className="toggleExplore">
                    <NavLink to="/explorer" className="toggleExploreNavLink">
                        <Button className="toggleExploreButtonPartner">
                            <Typography>Partner</Typography>
                        </Button>
                    </NavLink>
                    <NavLink to="/groupexplorer" className="toggleExploreNavLink">
                        <Button className="toggleExploreButton">
                            <Typography style={{color: '#04A2CA'}}>Gruppen</Typography>
                        </Button>
                    </NavLink>
                </div>
                {
                    (gruppenvorschlag && lerngruppe) ?
                        <div className="partnervorschlag">
                            <Fab disabled={this.state.buttonPressed} size="large"
                                 onClick={this.entscheidungFalse} className="buttonFalse">
                                <CancelIcon fontSize="large"/>
                            </Fab>

                            <div className="partnercard">
                                <GruppenProfilVorschau lerngruppe={lerngruppe}/>
                            </div>

                            <Fab disabled={this.state.buttonPressed}
                                 onClick={this.entscheidungTrue} size="large" className="buttonTrue">
                                <CheckCircleIcon fontSize="large"/>
                            </Fab>
                        </div>
                        :
                        <div className="partnervorschlagNotFound">
                            <Card>
                                <CardContent className="partnercard">
                                    <div>
                                        <Typography variant="h5">
                                            Dein neuer Vorschlag wird berechnet ...
                                        </Typography>
                                        <Delayed waitBeforeShow={7500}>
                                            <Typography variant="h6">
                                                Aktuell gibt es wohl keine passenden Lerngruppen für dich.
                                            </Typography>
                                            <Typography variant="h6">
                                                Empfehle die App deinen Kommilitonen weiter und freue dich auf deine
                                                nächsten Matches!
                                            </Typography>
                                            <Typography variant="h5">
                                                Stay tuned &#129299;
                                            </Typography>
                                        </Delayed>
                                    </div>

                                    <div>
                                        <CircularProgress/>
                                    </div>

                                </CardContent>
                            </Card>
                        </div>
                }

                <ContextErrorMessage
                    error={error} contextErrorMsg={`Nicht geklappt`}
                    onReload={this.getBestGruppenvorschlag}
                />
            </div>
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
LerngruppenExplorer.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(LerngruppenExplorer));