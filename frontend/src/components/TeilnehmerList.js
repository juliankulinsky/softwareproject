import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import {StudooAPI} from "../api";
import TeilnehmerListEntry from "./TeilnehmerListEntry";


class TeilnehmerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lerngruppe: props.lerngruppe,
            alleGruppenTeilnahmen: []
        }
    }

    /**
     * Alle Gruppenteilnehmer auslesen
     */
    getAlleGruppenTeilnahmenForGruppe = () => {
        StudooAPI.getAPI().getGruppenTeilnahmenForGruppenID(this.props.lerngruppe.getID())
            .then(gruppenTeilnahmen => {
                this.setState({
                    alleGruppenTeilnahmen: gruppenTeilnahmen
                })
            })
    }

    componentDidMount() {
        this.getAlleGruppenTeilnahmenForGruppe()
    }

    render() {
        const { classes } = this.props;
        const { lerngruppe, alleGruppenTeilnahmen } = this.state;

        return (
            <Typography>
                {
                    alleGruppenTeilnahmen ?
                        <Box>
                            <Typography variant="h6" style={{marginTop: "2%", marginBottom: "2%"}}>Gruppenmitglieder</Typography>
                            {
                                alleGruppenTeilnahmen.map(gruppenteilnahme =>
                                    <TeilnehmerListEntry
                                        currentperson={this.props.currentperson}
                                        gruppenteilnahme={gruppenteilnahme}
                                        lerngruppe={lerngruppe}
                                    />
                                )
                            }
                        </Box>
                        :
                        null
                }
            </Typography>
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
TeilnehmerList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TeilnehmerList);