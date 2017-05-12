import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

class Buttons extends React.Component {
    render() {
        return (
            <div className="Button-row">
                <RaisedButton label="Alphabetical" onTouchTap={this.props.alphaSort} primary={!this.props.alpha} secondary={this.props.alpha}/>
                <RaisedButton label="Created" onTouchTap={this.props.createdSort} primary={!this.props.created} secondary={this.props.created}/>
                <RaisedButton label="Modified" onTouchTap={this.props.modifiedSort} primary={!this.props.modified} secondary={this.props.modified}/>
            </div>
        );
    }
}
Buttons.propTypes = {
    alpha: PropTypes.bool.isRequired,
    alphaSort: PropTypes.func.isRequired,
    created: PropTypes.bool.isRequired,
    createdSort: PropTypes.func.isRequired,
    modified: PropTypes.bool.isRequired,
    modifiedSort: PropTypes.func.isRequired,
};
export default Buttons;