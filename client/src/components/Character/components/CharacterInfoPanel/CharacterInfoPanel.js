import React from 'react'

// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
// Asset imports.
// import LoadingIcon from '../../../vendor/d20.png';
// import { getUser } from '../apis/userAPI';
// import { checkAuth } from '../apis/authAPI';

import characterImg from '../../../../vendor/soot_isbjorn.png';

// import Cookies from 'js-cookie'

// React Icons imports
import { RiAccountBoxLine, RiFilePaper2Line, RiTShirt2Line, RiSwordLine, RiGitRepositoryLine, RiMapPin2Line, RiGroupLine, RiQuillPenLine, RiBookletLine, RiCalendar2Line, RiSettings2Line } from "react-icons/ri";

import InfoPanelButton from './components/InfoPanelButton';

/**
 * Temporary "Under Construction" header for the root page. Displays poorly drawn construction stick figure.
 * @returns the created component.
 */
class CharacterInfoPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedButton: this.props.selectedTool
        };
    }

    setSelected(selectedButton) {
        this.props.setTool(selectedButton);
        this.setState({
            ...this.state,
            selectedButton: selectedButton
        });
    }

    render() {
        return (
            <div>
                <img className='RPGToolIcon' src={characterImg} alt='RPGToolICon' style={{width:'100%', height: 'auto'}}/>
                <div className='characterTitle'>
                    <h1>Soot Isbjorn</h1>
                    <h3>Boreal Ursan, Outlander</h3>
                    <h4>2 Druid (Circle of Wildfire)</h4>
                    <h4>4 Barbarian (Path of the Ancestral Guardian)</h4>
                    <hr></hr>
                </div>
                <div>
                    <InfoPanelButton icon={<RiAccountBoxLine />} title='Information' selectedButton={this.state.selectedButton} setSelected={this.setSelected.bind(this)}/>
                    <InfoPanelButton icon={<RiFilePaper2Line />} title='Character Sheet' selectedButton={this.state.selectedButton} setSelected={this.setSelected.bind(this)} />
                    <InfoPanelButton icon={<RiTShirt2Line />} title='Equipment' selectedButton={this.state.selectedButton} setSelected={this.setSelected.bind(this)} />
                    <InfoPanelButton icon={<RiSwordLine />} title='Inventory' selectedButton={this.state.selectedButton} setSelected={this.setSelected.bind(this)} />
                    <InfoPanelButton icon={<RiGitRepositoryLine />} title='Spellbook' selectedButton={this.state.selectedButton} setSelected={this.setSelected.bind(this)} />
                    <InfoPanelButton icon={<RiMapPin2Line />} title='Quests' selectedButton={this.state.selectedButton} setSelected={this.setSelected.bind(this)} />
                    <InfoPanelButton icon={<RiGroupLine />} title='Relationships' selectedButton={this.state.selectedButton} setSelected={this.setSelected.bind(this)} />
                    <InfoPanelButton icon={<RiQuillPenLine />} title='Journal' selectedButton={this.state.selectedButton} setSelected={this.setSelected.bind(this)} />
                    <InfoPanelButton icon={<RiBookletLine />} title='Notebook' selectedButton={this.state.selectedButton} setSelected={this.setSelected.bind(this)} />
                    <InfoPanelButton icon={<RiCalendar2Line />} title='Calendar' selectedButton={this.state.selectedButton} setSelected={this.setSelected.bind(this)} />
                    <InfoPanelButton icon={<RiSettings2Line />} title='Settings' selectedButton={this.state.selectedButton} setSelected={this.setSelected.bind(this)} />
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    name: state.user.userInfo.username
});

export default connect(mapStateToProps)(CharacterInfoPanel);