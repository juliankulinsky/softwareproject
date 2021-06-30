import React from 'react';
import PropTypes from 'prop-types';


/**
 * Verzögerungs-Komponente, die bei der Explore-Seite eine Verzögerung einbaut, bevor keine Ergebnisse angezeigt werden.
 * Erst nach Ablauf der angegebenen ms werden die enthaltenen Komponenten angezeigt.
 */
class Delayed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {hidden : true};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({hidden: false});
        }, this.props.waitBeforeShow);
    }

    render() {
        return this.state.hidden ? '' : this.props.children;
    }
}

Delayed.propTypes = {
  waitBeforeShow: PropTypes.number.isRequired
};

export default Delayed;