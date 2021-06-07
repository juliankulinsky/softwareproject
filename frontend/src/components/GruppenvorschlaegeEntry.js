import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
//import AccountList from './AccountList';


class GruppenvorschlaegeEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gruppenvorschlaege: props.gruppenvorschlaege
        }
    }

    render() {
        const { classes } = this.props;
        const { gruppenvorschlag } = this.state;

        console.log("Ausgabe alle Gruppenvorschlaege:")
        console.log(this.state);

        return (
            <div>
                <Grid>
                    <Grid item>
                        <Typography className={classes.heading}>
                            Gruppenvorschläge:
                            {
                                gruppenvorschlaege.getGruppenVorschlaege()
                            }
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
GruppenvorschlaegeEntry.propTypes = {
  /** @ignore */
  //classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  nachricht: PropTypes.object.isRequired,

}

export default withStyles(styles)(GruppenvorschlaegeEntry);