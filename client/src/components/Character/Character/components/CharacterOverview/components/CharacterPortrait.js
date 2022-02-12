import React from 'react'

import { connect } from 'react-redux';

import { RiCameraLine } from 'react-icons/ri';

import { getCharacterPortrait, setCharacterPortrait }  from '../../../../../../apis/characterAPI';

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

    componentDidUpdate(prevProps) {
        if (this.props.characterId !== prevProps.characterId) {
            this.componentDidMount();
        }
    }

    render() {
        if (this.state.portraitFound == null) {
            return (
                <div className='container-alternate container-centered-content container-squared'></div>
            );
        } else if ((this.state.portraitFound === false || this.state.portraitString === '' || this.state.portraitEncodeTag === '') && !this.props.viewOnly) {
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
            if ((this.state.portraitFound === true && this.state.portraitString !== '' && this.state.portraitEncodeTag !== '')) {
                return (
                    <img src={this.state.portraitEncodeTag + this.state.portraitString} alt='RPGToolIcon' style={{display: 'block', height:'100%', width: '100%', objectFit: 'cover'}}/>
                )
            } else {
                return (
                    <div className='container-alternate container-centered-content container-squared'></div>
                )
            }
        }
    }
};

const mapStateToProps = (state, ownProps) => ({
    userId: state.user.userInfo.userId,
    character: state.character.characters[ownProps.characterId]
});

export default connect(mapStateToProps)(CharacterPortrait);