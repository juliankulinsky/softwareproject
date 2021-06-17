import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import {StudooAPI} from "../api";
//import AccountList from './AccountList';


class LerngruppeListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lerngruppe: props.lerngruppe
        }
    }

    deleteGruppenteilnahme = () => {
        StudooAPI.getAPI().getGruppenTeilnahmeByPersonIDundGruppenID(this.props.person.getID(),this.props.lerngruppe.getID())
            .then(gruppenTeilnahme => {
                StudooAPI.getAPI().deleteGruppenTeilnahme(gruppenTeilnahme.getID())
            })
        StudooAPI.getAPI().getChatTeilnahmeByPersonIDundKonversationID(this.props.person.getID(),this.props.lerngruppe.getKonversationId())
            .then(chatTeilnahme => {
                StudooAPI.getAPI().deleteChatTeilnahme(chatTeilnahme.getID())
            })

    }

    render() {
        const { classes } = this.props;
        const { lerngruppe } = this.state;

        return (
            <div>
                <Grid>
                    <Grid item>
                        <Typography className={classes.heading}>
                            ------------- <br/>
                            Gruppenname:
                            {
                                lerngruppe.getGruppenname()
                            } &nbsp;
                            <Button color="secondary" variant="contained" onClick={this.deleteGruppenteilnahme}>
                                Teilnahme beenden
                            </Button>
                            <br/>-------------

                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
LerngruppeListEntry.propTypes = {
  /** @ignore */
  //classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  lerngruppe: PropTypes.object.isRequired,

}

export default withStyles(styles)(LerngruppeListEntry);