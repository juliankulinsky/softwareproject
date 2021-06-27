import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Typography,
    IconButton,
    DialogTitle,
    DialogContent,
    Dialog
} from '@material-ui/core';
import { Button, Card, CardContent } from '@material-ui/core';
import {StudooAPI} from "../api";
import TeilnehmerList from "./TeilnehmerList";
import GruppenAnfragenList from "./GruppenAnfragenList";
import UpdateGruppennameDialog from "./dialogs/UpdateGruppennameDialog";
import "./components-theme.css";
import CloseIcon from "@material-ui/icons/Close";

/**
 * Rendert ein LerngruppeBO, mit der Möglichkeit mit dem "Teilnahme beenden"-Button die eigene Teilnahme zu dieser
 * Gruppe zu beenden, und falls man Admin der Gruppe ist, kann diese Gruppe über den "Verwalten"-Button verwaltet werden
 */
class LerngruppeListEntry extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lerngruppe: props.lerngruppe,
            gruppenprofil: null,
            eigeneGruppenTeilnahme: null,
            beendenButtonPressed: false,
            showUpdateGruppennameDialog: false,
            open: false
        }
    }

    /** Lädt das ProfilBO der als Props übergebenen Lerngruppe und setzt dieses als state */
    getGruppenprofil = () => {
        StudooAPI.getAPI().getProfil(this.props.lerngruppe.getProfilId())
            .then(profil => {
              this.setState({
                gruppenprofil: profil
              })
            })
      }

    /**
     * Lädt das eigene GruppenTeilnahmeBO durch die ID der aktuellen Person und der ID der übergebenen Lerngruppe
     * Dies wird gemacht, um schauen zu können, ob die aktuelle Person Admin der Gruppe ist.
     */
    getEigeneGruppenTeilnahme = () => {
        StudooAPI.getAPI().getGruppenTeilnahmeByPersonIDundGruppenID(this.props.currentperson.getID(),this.props.lerngruppe.getID())
            .then (gruppenTeilnahme => {
                this.setState({
                    eigeneGruppenTeilnahme: gruppenTeilnahme
                })
            })
    }

    /**
     * Löschen der eigenen GruppenTeilnahmeBO an der Lerngruppe und der dazugehörenden ChatTeilnahmeBO im Backend,
     * aufgerufen durch den "Teilnahme beenden"-Button
     */
    deleteTeilnahme = () => {
        this.setState({
            beendenButtonPressed: true
        })
        StudooAPI.getAPI().deleteGruppenTeilnahme(this.state.eigeneGruppenTeilnahme.getID())
        StudooAPI.getAPI().getChatTeilnahmeByPersonIDundKonversationID(this.props.currentperson.getID(),this.props.lerngruppe.getKonversationId())
            .then(chatTeilnahme => {
                StudooAPI.getAPI().deleteChatTeilnahme(chatTeilnahme.getID())
            })
    }

    /**
     * Handhabt das Öffnen des Dialogs, um den Gruppenname und die Gruppenbeschreibung ändern zu können
     */
    openUpdateGruppennameDialog = () => {
        this.setState({
            showUpdateGruppennameDialog: true
        })
    }

    /**
     * Handhabt das Schließen des Dialogs, um den Gruppenname und die Gruppenbeschreibung ändern zu können
     */
    updateGruppennameDialogClosed = () => {
        this.setState({
            showUpdateGruppennameDialog: false
        })
    }

    /**
     * Handhabt das Schließen des Verwaltungs-Dialog schließen
     */
    handleClose = () => {
        // Reset the state
        this.setState({
        open: false
        });
    }

    /**
     * Handhabt das Öffnen des Verwaltungs-Dialog schließen
     */
    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    /**
     * Lifecycle Methode, which is called when the component gets inserted into the browsers DOM.
     * Ruft die Methoden auf, welche die Daten aus dem Backend laden.
     */
    componentDidMount() {
        this.getGruppenprofil();
        this.getEigeneGruppenTeilnahme();
        this.interval = setInterval(() => this.getGruppenprofil(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /** Rendert die Komponente */
    render() {
        const { classes } = this.props;
        const { lerngruppe, gruppenprofil, eigeneGruppenTeilnahme, beendenButtonPressed, showUpdateGruppennameDialog, open } = this.state;

        return (
            <div className="lerngruppeListWholeCard">
                <Card>
                    <CardContent >
                        <div className="lerngruppeListCard">
                            { lerngruppe ?
                                <Typography className={classes.heading} variant="h5">
                                    {lerngruppe.getGruppenname()}
                                </Typography>
                                : null
                            }


                            <div className="lerngruppeListButtons">
                                <Button disabled={beendenButtonPressed} color="secondary" variant="contained" onClick={this.deleteTeilnahme}>
                                    Teilnahme beenden
                                </Button>
                                    {
                                        eigeneGruppenTeilnahme && eigeneGruppenTeilnahme.get_ist_admin() ?
                                    <>
                                        &nbsp;
                                            <Button disabled={beendenButtonPressed}
                                                    color={"primary"} variant={"contained"}
                                                    onClick={this.handleOpen}>
                                                Verwalten
                                            </Button>

                                            {
                                                open ?
                                                    <>
                                                    <Dialog open={open} onClose={this.handleClose} maxWidth='xs'>
                                                        <div className="lerngruppeListCard">
                                                            <DialogTitle id='form-dialog-title' >
                                                                <Typography variant="h6">Gruppenverwaltung</Typography>
                                                            </DialogTitle>
                                                            <IconButton className={classes.closeButton} onClick={this.handleClose}>
                                                                    <CloseIcon />
                                                            </IconButton>
                                                            </div>

                                                        <DialogContent>

                                                            <Button color={"primary"}  onClick={this.openUpdateGruppennameDialog}>
                                                                Gruppendaten ändern
                                                            </Button>
                                                            <UpdateGruppennameDialog
                                                                show={showUpdateGruppennameDialog}
                                                                lerngruppe={lerngruppe}
                                                                gruppenprofil={gruppenprofil}
                                                                onClose={this.updateGruppennameDialogClosed}
                                                            />
                                                            <hr/>
                                                            <GruppenAnfragenList
                                                                currentperson={this.props.currentperson}
                                                                lerngruppe={lerngruppe}
                                                            />
                                                            <hr/>
                                                            <TeilnehmerList
                                                                currentperson={this.props.currentperson}
                                                                lerngruppe={lerngruppe}
                                                            />

                                                        </DialogContent>
                                                    </Dialog>
                                                    </>
                                                    : null
                                            }
                                    </>
                                    :
                                    null
                                    }
                            </div>
                        </div>
                        <div className="lerngruppeListCard">{
                            gruppenprofil ?
                                <Typography>
                                    {
                                        gruppenprofil.getBeschreibung()
                                    }
                                </Typography>
                            :
                                <Typography>Keine Beschreibung vorhanden.</Typography>
                        }
                        </div>
                    </CardContent>
                </Card>
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
LerngruppeListEntry.propTypes = {
  lerngruppe: PropTypes.object.isRequired,
}

export default withStyles(styles)(LerngruppeListEntry);