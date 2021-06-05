import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


class LernvorliebenListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lernvorliebe: props.lernvorliebe
        }
    }

    render() {
        const { classes } = this.props;
        const { lernvorliebe } = this.state;

        console.log("LV Entry das LV Objekt")
        console.log(this.state);

        return (
            <div>
                <Grid>
                    <Grid item>
                        <Typography className={classes.heading}>
                            Lerntyp:
                            {
                                lernvorliebe.get_lerntyp()
                            }
                            Extro:
                            {
                                lernvorliebe.get_extrovertiertheit()
                            }
                        </Typography>
                    </Grid>
                </Grid>
                Ende der Lernvorlieben
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
LernvorliebenListEntry.propTypes = {
  /** @ignore */
  //classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  lernvorliebe: PropTypes.object.isRequired,

}

export default withStyles(styles)(LernvorliebenListEntry);