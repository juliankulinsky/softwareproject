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

    /** Lädt das Profil der als Props übergebenen Lerngruppe und setzt dieses und die Beschreibung als state */
    getGruppenprofil = () => {
        StudooAPI.getAPI().getProfil(this.props.lerngruppe.getProfilId())
            .then(profil => {
              this.setState({
                gruppenprofil: profil
              })
            })
      }

    /**
     * Um schauen zu können, ob man Admin in der Gruppe ist
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
     * Um die eigene Teilnahme einer Lerngruppe zu löschen
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
     * Änderung für Gruppennamen über einen sich öffnenden Dialog
     */
    openUpdateGruppennameDialog = () => {
        this.setState({
            showUpdateGruppennameDialog: true
        })
    }

    /**
     * Den Gruppennamen-Dialog schließen
     */
    updateGruppennameDialogClosed = () => {
        this.setState({
            showUpdateGruppennameDialog: false
        })
    }

    /**
     * Den Verwaltungs-Dialog schließen
     */
    handleClose = () => {
        // Reset the state
        this.setState({
        open: false
        });
    }

    /**
     * Den Verwaltungs-Dialog öffnen
     */
    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    componentDidMount() {
        this.getGruppenprofil()
        this.getEigeneGruppenTeilnahme()
    }

    render() {
        const { classes } = this.props;
        const { lerngruppe, gruppenprofil, eigeneGruppenTeilnahme, beendenButtonPressed, showUpdateGruppennameDialog, open } = this.state;

        return (
            <div className="lerngruppeListWholeCard">
                <Card>
                    <CardContent >
                        <div className="lerngruppeListCard">
                        <Typography className={classes.heading} variant="h5">
                        {lerngruppe.getGruppenname()}
                        </Typography>

                            <div className="lerngruppeListButtons">
                                <Button disabled={beendenButtonPressed} color="secondary" variant="contained" onClick={this.deleteTeilnahme}>
                                    Teilnahme beenden
                                </Button>
                                    {
                                        eigeneGruppenTeilnahme && eigeneGruppenTeilnahme.get_ist_admin() ?
                                    <>
                                        &nbsp;
                                            <Button color={"primary"} variant={"contained"}
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
                                                                Gruppenname ändern
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

/** Component specific styles */
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