import React from 'react'

// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
// Asset imports.
// import LoadingIcon from '../../../vendor/d20.png';
// import { getUser } from '../apis/userAPI';
import { getCharacterOverview } from '../../actions/characterActions';

import AccessDenied from '../AccessDenied';
import RouteNotFound from '../RouteNotFound';
import Navbar from '../Navbar/Navbar';

import CharacterOverview from './components/CharacterOverview/CharacterOverview';
import CharacterInformation from './components/CharacterInformation/CharacterInformation';

import Spellbook from '../Spellbook/Spellbook';
import UnderConstruction from '../UnderConstruction';

/**
 * Temporary "Under Construction" header for the root page. Displays poorly drawn construction stick figure.
 * @returns the created component.
 */
class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTool: null
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
        this.props.dispatch(getCharacterOverview(this.props.characterId));
    }

    componentDidUpdate(prevProps) {
        // This logic will fire after the data is set in redux so that we can get the default tool, update the state to that tool, and pass it down.
        if (this.state.selectedTool == null) {
            if (this.props.character != null && this.props.character.characterOverview != null) {
                this.setSelectedTool(this.props.character.characterOverview.defaultTool);
            }
        }
    }

    render() {
        if (this.props.character == null) {
            return null;
        } else {
            if (this.props.character.characterExists === false) {
                return <RouteNotFound />
            } else if (this.props.character.authorizedUser === false) {
                return <AccessDenied />
            } else {
                return (
                    <div>
                        <Navbar></Navbar>
                        <div className='container-grid-horizontal-menu-body-parent'>
                            <div className='container-grid-horizontal-menu-child'>
                                <CharacterOverview characterId={this.props.characterId} selectedTool={this.state.selectedTool} setTool={this.setSelectedTool.bind(this)}></CharacterOverview>
                            </div>
                            <div className='container-grid-horizontal-body-child'>
                                {
                                    (this.state.selectedTool === 'Information')  && <CharacterInformation />
                                }
                                {
                                    (this.state.selectedTool === 'Character Sheet') && <UnderConstruction />
                                }
                                {
                                    (this.state.selectedTool === 'Equipment') && <UnderConstruction />
                                }
                                {
                                    (this.state.selectedTool === 'Inventory') && <UnderConstruction />
                                }
                                {
                                    (this.state.selectedTool === 'Spellbook') && <Spellbook />
                                }
                                {
                                    (this.state.selectedTool === 'Quests') && <UnderConstruction />
                                }
                                {
                                    (this.state.selectedTool === 'Relationships') && <UnderConstruction />
                                }
                                {
                                    (this.state.selectedTool === 'Journal') && <UnderConstruction />
                                }
                                {
                                    (this.state.selectedTool === 'Notebook') && <UnderConstruction />
                                }
                                {
                                    (this.state.selectedTool === 'Calendar') && <UnderConstruction />
                                }
                                {
                                    (this.state.selectedTool === 'Settings') && <UnderConstruction />
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
};

const mapStateToProps = (state, ownProps) => ({
    character: state.character[ownProps.characterId]
});

export default connect(mapStateToProps)(Character);