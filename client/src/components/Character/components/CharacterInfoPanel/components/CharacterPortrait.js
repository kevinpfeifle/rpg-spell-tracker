import React from 'react'

import { connect } from 'react-redux';

import { RiCameraLine } from 'react-icons/ri';

import { getCharacterPortrait, setCharacterPortrait }  from '../../../../../apis/characterAPI';

/**
 * Temporary "Under Construction" header for the root page. Displays poorly drawn construction stick figure.
 * @returns the created component.
 */
class CharacterPortrait extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portraitFound: null,
            portraitString: '',  
            portraitEncodeTag: ''
        }
    }

    uploadPortrait(event) {
        if(event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (e) => {
                this.setState({
                    ...this.state, 
                    portraitFound: true,
                    portraitString: e.target.result.substring(e.target.result.indexOf(',') + 1),
                    portraitEncodeTag: e.target.result.substring(0, e.target.result.indexOf(',') + 1)
                }, function() {
                    setCharacterPortrait(this.state.portraitString, this.state.portraitEncodeTag, this.props.character.characterOverview.characterId, this.props.userId);
                });
            };
        }
    }

    componentDidMount() {
        getCharacterPortrait(this.props.character.characterOverview.characterId, this.props.userId).then((results) => {
            if (results && results != {}) {
                this.setState({
                    ...this.state, 
                    portraitFound: true,
                    portraitString: results.portrait_bytes,
                    portraitEncodeTag: results.portrait_encode_tag
                });
            }
        }).catch((err) => {
            // Something failed with fetching the image... likely because there is no image. For now, just render the image upload, will make it better later.
            this.setState({
                ...this.state, 
                portraitFound: false
            });
        })
    }

    render() {
        if (this.state.portraitFound == null) {
            return null;
        } else if (this.state.portraitFound === false || this.state.portraitString === '' || this.state.portraitEncodeTag === '') {
            return (
                <div>  
                    <label htmlFor='portraitUpload'>
                        <div className='container-alternate container-centered-content container-squared'>
                            <RiCameraLine  style={{color:'white', width:'50%', height: 'auto'}} />    
                        </div>
                    </label>
                    <input type='file' id='portraitUpload' name='portraitUpload' value={this.state.portraitString} onChange={this.uploadPortrait.bind(this)} />
                </div>
            )
        } else {
            // let characterDetails = this.props.character.characterOverview;
            return (
                <div>
                    <img className='RPGToolIcon' src={this.state.portraitEncodeTag + this.state.portraitString} alt='RPGToolICon' style={{width:'100%', height: 'auto'}}/>
                </div>
            )
        }
    }
};

const mapStateToProps = (state, ownProps) => ({
    userId: state.user.userInfo.userId,
    test: ownProps.characterId,
    character: state.character[ownProps.characterId]
});

export default connect(mapStateToProps)(CharacterPortrait);