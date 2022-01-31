import React from 'react'

// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
// Asset imports.
// import LoadingIcon from '../../../vendor/d20.png';
// import { getUser } from '../apis/userAPI';
import { getCharacterOverview } from '../../apis/characterAPI';

import Navbar from '../Navbar/Navbar';

import CharacterInfoPanel from './components/CharacterInfoPanel/CharacterInfoPanel';
import CharacterInformation from './components/CharacterInformation/CharacterInformation';

import Spellbook from '../Spellbook/Spellbook';
import UnderConstruction from '../UnderConstruction';
import characterImg from '../../vendor/soot_isbjorn.png';

/**
 * Temporary "Under Construction" header for the root page. Displays poorly drawn construction stick figure.
 * @returns the created component.
 */
class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTool: 'Spellbook'
        };
    }

    setSelectedTool(selectedTool) {
        this.setState({
            ...this.state,
            selectedTool: selectedTool
        });
    }

    componentDidMount() {
        // Fetch information about the user's character.
        getCharacterOverview(this.props.userId, this.props.activeCharacterId).then(() => {

        });


        // getUser().then((details) => {
        //     // console.log(details);
        //     if (!details) {
        //         // Would redirect, display no name;
        //         this.setState({
        //             ...this.state,
        //             name: "Guest"
        //         });
        //     } else {
        //         this.setState({
        //             ...this.state,
        //             name: details.username
        //         });
        //     }
        // });
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div class='container-grid-horizontal-menu-body-parent'>

                        <div class='container-grid-horizontal-menu-child'>
                            <CharacterInfoPanel selectedTool={this.state.selectedTool} setTool={this.setSelectedTool.bind(this)}></CharacterInfoPanel>
                        </div>
                        <div class='container-grid-horizontal-body-child'>
                            {
                                (this.state.selectedTool === 'Information')  && <CharacterInformation />
                            }
                            {
                                (this.state.selectedTool === 'Spellbook') && <Spellbook />
                            }
                            {
                                (this.state.selectedTool === 'Character Sheet') && <UnderConstruction />
                            }
                        </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    // userAuthenticated: state.auth.userInfo.authenticated,
    userId: state.user.userInfo.userId
    // activeCharacterId: state.user.activeCharacterId
});

export default connect(mapStateToProps)(Character);