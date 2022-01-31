import React from 'react'

import { connect } from 'react-redux';

/**
 * Temporary "Under Construction" header for the root page. Displays poorly drawn construction stick figure.
 * @returns the created component.
 */
class InfoPanelButton extends React.Component {
    constructor(props) {
        super(props);
    }

    selectButton () {
        if (this.props.selectedButton !== this.props.title) {
            this.props.setSelected(this.props.title);
        }
    }

    render() {
        let selectedClass = (this.props.selectedButton === this.props.title) ? 'characterButtonSelected' : 'characterButtonUnselected';
        return (
            <div className={selectedClass} onClick={this.selectButton.bind(this)}>
                <h3>{this.props.icon} {this.props.title}</h3>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    name: state.user.userInfo.username
});

export default connect(mapStateToProps)(InfoPanelButton);