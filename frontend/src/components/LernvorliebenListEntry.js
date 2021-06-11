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

        return (
            <div>
                <Grid>
                    <Grid item>
                        <Typography className={classes.heading}>
                            Lerntyp:
                            {
                                lernvorliebe.get_lerntyp()
                            }
                            Frequenz:
                            {
                                lernvorliebe.get_frequenz()
                            }
                            Extro:
                            {
                                lernvorliebe.get_extrovertiertheit()
                            }
                            RemPra:
                            {
                                lernvorliebe.get_remote_praesenz()
                            }
                            Vorkenntnisse:
                            {
                                lernvorliebe.get_vorkenntnisse()
                            }
                            Lerninteressen:
                            {
                                lernvorliebe.get_lerninteressen()
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