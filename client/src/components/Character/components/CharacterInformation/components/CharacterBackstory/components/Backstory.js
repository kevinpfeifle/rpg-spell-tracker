import React from 'react'

import { connect } from 'react-redux';

/**
 * Temporary "Under Construction" header for the root page. Displays poorly drawn construction stick figure.
 * @returns the created component.
 */
class Backstory extends React.Component {
    constructor(props) {
        super(props);
        // Will need to update this to come from the DB!
        this.state = {
            hasBackstory: true
        }
    }

    render() {
        return (
            <div className="container">
                {(this.state.hasBackstory) && test}
                {(!this.state.hasBackstory) && test2}
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    // name: state.auth.userInfo.username
});

export default connect(mapStateToProps)(Backstory);