import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Button,
    Typography,
    Card,
    CardContent,
    Fab,
} from '@material-ui/core';
import { withRouter, NavLink } from 'react-router-dom';
import StudooAPI from '../api/StudooAPI'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import CircularProgress from '@material-ui/core/CircularProgress';
import {PartnerVorschlagBO} from "../api";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from '@material-ui/icons/Cancel';
import "./components-theme.css"
import ProfilVorschau from "./ProfilVorschau";
import Delayed from "./Delay";

/**
 * Rendert den am besten zur aktuellen Person passenden PartnerVorschlagBO mit Anzeigen von Informationen über die
 * vorgeschlagene Person. Zusätzlich besteht die Möglichkeit, diesen Vorschlag über zwei Button entweder anzunehmen,
 * wodurch der PartnerVorschlagBO aktualisiert wird. In beiden Fällen wird die Entscheidung der aktuellen Person auf
 * true gesetzt, was konkret entweder die EntscheidungPerson oder die EntscheidungPartner des PartnerVorschlagBO ist,
 * abhängig davon, welche Rolle die aktuelle Person in diesem PartnerVorschlagBO einnimmt.
 * Bei Annehmen werden die Matchpoints um 1 erhöht und bei Ablehnen werden die Matchpoints nicht verändert
 */
class PartnerExplorer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            partnervorschlag: null,
            currentPerson: this.props.person,
            anderePerson: null,
            entscheidung: null,
            matchpoints: 0,
            error: null,
            loadingInProgress: false,
            updatingInProgress: false,
            updatingError: null,
            buttonPressed: false,
        }
    }

    /**
     * Auslesen der anderen Person, die in diesem PartnerVorschlagBO teilnimmt. Falls die aktuelle Person die "Person"
     * des PartnerVorschlagBO ist, wird der "Partner" geladen, und falls die aktuelle Person der "Partner" des
     * PartnerVorschlagBO ist, wird die "Person" geladen.
     */
    getAnderePerson = () => {
        if (this.props.person.getID() === this.state.partnervorschlag.getPersonID()) {
            StudooAPI.getAPI().getPerson(this.state.partnervorschlag.getPartnerID())
                .then(anderePerson => {
                    this.setState({
                        anderePerson: anderePerson
                    })
                    console.log("andere p", anderePerson)
                })


        } else if (this.props.person.getID() === this.state.partnervorschlag.getPartnerID()) {
            StudooAPI.getAPI().getPerson(this.state.partnervorschlag.getPersonID())
                .then(anderePerson =>
                    this.setState({
                        anderePerson: anderePerson
                    }))
        }
    }

    /**
     * Auslesen des PartnerVorschlagBO mit der höchsten Ähnlichkeit, an der die aktuelle Person teilnimmt, bei dem
     * die aktuelle Person noch keine Entscheidung getroffen hat.
     */
    getBestPartnervorschlag = () => {
        StudooAPI.getAPI().getPartnerVorschlagByPersonID(this.props.person.getID())
            .then(partnervorschlagBO => {
                this.setState({
                    partnervorschlag: partnervorschlagBO,
                    error: null,
                    loadingInProgress: false
                });
                if (this.state.partnervorschlag != null) {
                    this.setState({
                        matchpoints: partnervorschlagBO.getMatchpoints()
                    })
                    this.getAnderePerson()
                }
            }).catch(e => this.setState({
            partnervorschlag: null,
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
            this.updatePartnervorschlag()
        });
    }

    /** Wird durch "Ablehnen"-Button aufgerufen, setzt die Entscheidung auf false und ruft die Update-Funktion auf */
    entscheidungFalse = () => {
        this.setState({
            entscheidung: false,
            buttonPressed: true
        }, function () {
            this.updatePartnervorschlag()
        });
    }

    /**
     * Updaten des PartnerVorschlagBO, wobei die Matchpoints abhängig von der Entscheidung um 1 höher gesetzt werden
     * oder so bleiben. Die Entscheidung der "Person" oder des "Partners" (abhängig davon welche "Rolle" die aktuelle
     * Person im Vorschlag spielt) wird auf true gesetzt, was bedeutet, dass eine Entscheidung getroffen wurde.
     */
    updatePartnervorschlag = () => {
        let updatedPartnerVorschlag = Object.assign(new PartnerVorschlagBO(), this.state.partnervorschlag);
        if (this.props.person.getID() === this.state.partnervorschlag.getPersonID()) {
            updatedPartnerVorschlag.setEntscheidungPerson(true);
            if (this.state.entscheidung) {
                updatedPartnerVorschlag.setMatchpoints(this.state.matchpoints += 1)
            }
        } else if (this.props.person.getID() === this.state.partnervorschlag.getPartnerID()) {
            updatedPartnerVorschlag.setEntscheidungPartner(true);
            if (this.state.entscheidung) {
                updatedPartnerVorschlag.setMatchpoints(this.state.matchpoints += 1)
            }
        }
        StudooAPI.getAPI().updatePartnerVorschlag(updatedPartnerVorschlag)
            .then(partnerVorschlag => {
                this.setState({
                    updatingInProgress: false,
                    updatingError: null
                });
            }).catch(e =>
            this.setState({
                updatingInProgress: false,
                updatingError: e
            }));
        this.setState({
            partnervorschlag: null,
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
        this.getBestPartnervorschlag();
        this.interval = setInterval(() => this.getBestPartnervorschlag(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /** Rendert die Komponente */
    render() {
        const {classes} = this.props;
        const {partnervorschlag, anderePerson, error, loadingInProgress} = this.state;

        return (
            <div className={classes.root}>
                <div className="toggleExplore">
                    <NavLink to="/explorer" className="toggleExploreNavLink">
                        <Button className="toggleExploreButtonPartner">
                            <Typography style={{color: '#04A2CA'}}>Partner</Typography>
                        </Button>
                    </NavLink>
                    <NavLink to="/groupexplorer" className="toggleExploreNavLink">
                        <Button className="toggleExploreButton">
                            <Typography>Gruppen</Typography>
                        </Button>
                    </NavLink>
                </div>
                {
                    (partnervorschlag && anderePerson) ?
                        <div className="partnervorschlag">
                            <Fab disabled={this.state.buttonPressed} size="large"
                                 onClick={this.entscheidungFalse} className="buttonFalse">
                                <CancelIcon fontSize="large"/>
                            </Fab>

                            <div className="partnercard">
                                <ProfilVorschau person={anderePerson} selfperson={false}/>
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
                                                Aktuell gibt es wohl keine passenden Lernpartner für dich.
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
                    onReload={this.getBestPartnervorschlag}
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
PartnerExplorer.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(PartnerExplorer));