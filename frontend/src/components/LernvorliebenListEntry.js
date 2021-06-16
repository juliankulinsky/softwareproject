import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProfilLernvorliebenForm from "./dialogs/ProfilLernvorliebenForm";



class LernvorliebenListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lernvorliebe: props.lernvorliebe
        }
    }

    /** Handles the onClick event of the edit customer button */
  editProfilLernvorliebenButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProfilLernvorliebenForm: true
    });
  }

  /** Handles the onClose event of the CustomerForm */
  profilLernvorliebenFormClosed = (lernvorliebe) => {
    // Lernvorliebe is not null and therefor changed
    if (lernvorliebe) {
      this.setState({
        lernvorliebe: lernvorliebe,
        showProfilLernvorliebenForm: false
      });
    } else {
      this.setState({
        showProfilLernvorliebenForm: false
      });
    }
  }

    render() {
        const { classes } = this.props;
        const { lernvorliebe, showProfilLernvorliebenForm } = this.state;

        return (
            <div>
                <Grid>
                    <Grid item>
                        {/*
                            <ButtonGroup variant='text' size='small'>
                                <Button color='primary' onClick={this.editProfilLernvorliebenButtonClicked}>
                                    edit
                                </Button>
                            </ButtonGroup>
                            */
                        }<Typography className={classes.heading}>
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
                {/*
                    <ProfilLernvorliebenForm show={showProfilLernvorliebenForm} lernvorliebe={lernvorliebe}
                                             onClose={this.profilLernvorliebenFormClosed}/>
                */}
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