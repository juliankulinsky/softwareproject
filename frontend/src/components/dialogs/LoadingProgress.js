import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, LinearProgress } from '@material-ui/core';

/**
 * Zeigt einen Ladebalken an, wenn das Property show 'true' ist.
 *
 * @See See Materiel-UIs [Progress](https://material-ui.com/components/progress/)
 * @See See Materiel-UIs [LinearProgress](https://material-ui.com/api/linear-progress/)
 *
 */
class LoadingProgress extends Component {

  /** Rendern der Komponente LoadingProgress */
  render() {
    const { classes, show } = this.props;

    return (
      show ?
        <div className={classes.root}>
          <LinearProgress color='secondary' />
        </div>
        : null
    );
  }
}

/** Komponenten spezifische styles */
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
  }
});

/** PropTypes */
LoadingProgress.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** If true, the loading progress is rendered */
  show: PropTypes.bool,
}

export default withStyles(styles)(LoadingProgress);
