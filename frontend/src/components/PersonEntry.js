import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import ProfilForm from "./dialogs/ProfilForm";
//import AccountList from './AccountList';


/**
 * Renders a CustomerBO object within a expandable/collapsible CustomerListEntry with the customer manipulation
 * functions. If expanded, it renders a AccountList.
 *
 * @see See [AccountList](#accountlist)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class PersonEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      person: props.person,
      showProfilForm: false,
      showProfilDeleteDialog: false,
    };
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.person);
  }

  /** Handles onAccountDelete events from an AccountListEntry */
  deleteAccountHandler = (deletedAccount) => {
    // console.log(deletedAccount.getID());
    this.setState({
      accounts: this.state.accounts.filter(account => account.getID() !== deletedAccount.getID())
    })
  }

  /** Handles the onClick event of the edit person button */
  editProfilButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProfilForm: true
    });
  }

  /** Handles the onClose event of the CustomerForm */
  profilFormClosed = (person) => {
    // customer is not null and therefor changed
    if (person) {
      this.setState({
        person: person,
        showProfilForm: false
      });
    } else {
      this.setState({
        showProfilForm: false
      });
    }
  }

  /** Handles the onClick event of the delete customer button */
  deleteProfilButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProfilDeleteDialog: true
    });
  }

  /** Handles the onClose event of the CustomerDeleteDialog */
  deleteProfilDialogClosed = (person) => {
    // if customer is not null, delete it
    if (person) {
      this.props.onPersonDeleted(person);
    }

    // Don´t show the dialog
    this.setState({
      showProfilDeleteDialog: false
    });
  }

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states customer
    const { person, showProfilForm, showProfilDeleteDialog } = this.state;

     console.log(this.state);
    return (
        <div>
          <div>
            <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editProfilButtonClicked}>
                    edit
                  </Button>
            </ButtonGroup>
          </div>
          Name:
          {
            person.getName()
          }
          Alter:
          {
            person.getAlter()
          }
          Wohnort:
          {
            person.getWohnort()
          }
          Studiengang:
          {
            person.getStudiengang()
          }
          Semester:
          {
            person.getSemester()
          }

          <ProfilForm show={showProfilForm} person={person} onClose={this.profilFormClosed} />
          <PersonDeleteDialog show={showProfilDeleteDialog} person={person} onClose={this.deleteProfilDialogClosed} />
      </div>

    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
PersonEntry.propTypes = {
  /** @ignore */
  //classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  person: PropTypes.object.isRequired,
  /** The state of this CustomerListEntry. If true the customer is shown with its accounts */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this CustomerListEntry
   *
   * Signature: onExpandedStateChange(CustomerBO customer)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Event Handler function which is called after a sucessfull delete of this customer.
   *
   * Signature: onCustomerDelete(CustomerBO customer)
   */
  onProfilDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(PersonEntry);
