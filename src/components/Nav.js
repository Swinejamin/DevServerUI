import React from 'react';
import PropTypes from 'prop-types';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: '20%'
        }
    }

    componentWillUpdate() {
        this.setState({
            width: window.innerWidth / 5
        })
    }

    render() {
        return (
            <Drawer docked={this.props.large} width={this.state.width} open={this.props.large || this.props.open}
                    onRequestChange={this.props.onRequestChange}>
                <MenuItem>Menu Item</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
            </Drawer>
        );
    }
}
Nav.propTypes = {
    open: PropTypes.bool
};

export default Nav;