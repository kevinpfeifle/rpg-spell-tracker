import React from 'react'

import { connect } from 'react-redux';
// Asset imports.

import characterImg from '../../../../vendor/soot_isbjorn.png';
// React Icons imports
import { RiAccountBoxLine, RiFilePaper2Line, RiTShirt2Line, RiSwordLine, RiGitRepositoryLine, RiMapPin2Line, RiGroupLine, RiQuillPenLine, RiBookletLine, RiCalendar2Line, RiSettings2Line } from "react-icons/ri";

import InfoPanelButton from './components/InfoPanelButton';
import CharacterPortrait from './components/CharacterPortrait';

/**
 * Temporary "Under Construction" header for the root page. Displays poorly drawn construction stick figure.
 * @returns the created component.
 */
class CharacterInfoPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    setSelected(selectedButton) {
        this.props.setTool(selectedButton);
    }

    render() {
        if (this.props.character == null || this.props.character.characterOverview == null) {
            return null;
        } else {
            let characterDetails = this.props.character.characterOverview;
            return (
                <div>
                    {/* <img className='RPGToolIcon' src={characterImg} alt='RPGToolICon' style={{width:'100%', height: 'auto'}}/> */}
                    <CharacterPortrait characterId={characterDetails.characterId} />
                    <div className='characterTitle'>
                        <h1>{characterDetails.characterName}</h1>
                        <h3>{characterDetails.characterRace}, {characterDetails.characterBackground}</h3>
                        {
                            characterDetails.characterClasses.map((charClass, index) => (
                                <h4 key={index}>{characterDetails.classLevels[index]} {charClass} ({characterDetails.classSubclasses[index]})</h4>
                            ))
                        }
                        <hr></hr>
                    </div>
                    <div>
                        <InfoPanelButton icon={<RiAccountBoxLine />} title='Information' selectedButton={this.props.selectedTool} setSelected={this.setSelected.bind(this)}/>
                        <InfoPanelButton icon={<RiFilePaper2Line />} title='Character Sheet' selectedButton={this.props.selectedTool} setSelected={this.setSelected.bind(this)} />
                        <InfoPanelButton icon={<RiTShirt2Line />} title='Equipment' selectedButton={this.props.selectedTool} setSelected={this.setSelected.bind(this)} />
                        <InfoPanelButton icon={<RiSwordLine />} title='Inventory' selectedButton={this.props.selectedTool} setSelected={this.setSelected.bind(this)} />
                        <InfoPanelButton icon={<RiGitRepositoryLine />} title='Spellbook' selectedButton={this.props.selectedTool} setSelected={this.setSelected.bind(this)} />
                        <InfoPanelButton icon={<RiMapPin2Line />} title='Quests' selectedButton={this.props.selectedTool} setSelected={this.setSelected.bind(this)} />
                        <InfoPanelButton icon={<RiGroupLine />} title='Relationships' selectedButton={this.props.selectedTool} setSelected={this.setSelected.bind(this)} />
                        <InfoPanelButton icon={<RiQuillPenLine />} title='Journal' selectedButton={this.props.selectedTool} setSelected={this.setSelected.bind(this)} />
                        <InfoPanelButton icon={<RiBookletLine />} title='Notebook' selectedButton={this.props.selectedTool} setSelected={this.setSelected.bind(this)} />
                        <InfoPanelButton icon={<RiCalendar2Line />} title='Calendar' selectedButton={this.props.selectedTool} setSelected={this.setSelected.bind(this)} />
                        <InfoPanelButton icon={<RiSettings2Line />} title='Settings' selectedButton={this.props.selectedTool} setSelected={this.setSelected.bind(this)} />
                    </div>
                </div>
            )
     }
    }
};

const mapStateToProps = (state, ownProps) => ({
    character: state.character[ownProps.characterId]
});

export default connect(mapStateToProps)(CharacterInfoPanel);