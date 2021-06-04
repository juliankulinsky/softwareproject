import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
//import AccountList from './AccountList';


class TestListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lerngruppe: props.lerngruppe
        }
    }

    render() {
        const { classes } = this.props;
        const { lerngruppe } = this.state;

        console.log("Aus TestListEntry das aktuelle Lerngruppen-Objekt:")
        console.log(this.state);

        return (
            <div>
                <Grid>
                    <Grid item>
                        <Typography className={classes.heading}>
                            Gruppenname:
                            {
                                lerngruppe.getGruppenname()
                            }

                        </Typography>
                    </Grid>
                </Grid>
                Ende von einem Entry
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
TestListEntry.propTypes = {
  /** @ignore */
  //classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  lerngruppe: PropTypes.object.isRequired,

}

export default withStyles(styles)(TestListEntry);