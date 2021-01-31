// React import
import React from 'react'

// React Icons imports
import { RiCloseLine } from "react-icons/ri";

import DropDownBox from './components/DropDownBox';
import DropDownItem from './components/DropDownItem';

class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.container = React.createRef(); // This is a ref to the overall dropdown, to detect when focus shifts outside.
        this.state = { 
            focused: false,
            selectItems: props.selectItems
        };
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false);
    }
    
    // handleClick determines if the focus was moved outside of the dropdown when an event click happens, to remove the dropdown contents from view.
    handleClick = (e) => {
        if (!this.container.contains(e.target)) {
            this.setState({...this.state, focused: false});
        }
    }

    render() {
        // Function passed into each dropdown item, sets state of the current array of selected items.
        const handleSelect = (result) => {
            let alteredIndex = this.state.selectItems.findIndex((item) => item.value === result.value);
            let updatedItems = this.state.selectItems;
            updatedItems[alteredIndex].selected = result.selected;
            this.setState({...this.state, 
                selectItems: updatedItems
            });
            this.props.updateSelect(this.state.selectItems);
        }
        // Function similar to handleSelect, but removes the focus.
        const handleRemove = (result) => {
            let alteredIndex = this.state.selectItems.findIndex((item) => item.value === result.value);
            let updatedItems = this.state.selectItems;
            updatedItems[alteredIndex].selected = result.selected;
            this.setState({
                focused: false,
                selectItems: updatedItems
            });
            this.props.updateSelect(this.state.selectItems);
        }

        // Function to set all select items as false/unselected. Removes focus.
        const deselectAll = (e) => {
            e.stopPropagation(); // Ensures clicking this subcomponent does not trigger parent onclick.
            let updatedItems = this.state.selectItems;
            updatedItems.forEach((item) => {
                item.selected = false;
            });
            this.setState({
                focused: false,
                selectItems: updatedItems
            });
            this.props.updateSelect(this.state.selectItems);
        }

        return (
            <div ref={(container) => this.container = container} className='testx'>
                <div className='test1' onClick={() => this.setState({...this.state, focused: !this.state.focused})}>
                    {!this.state.selectItems.some((item) => item.selected) && (<p>{this.props.defaultText}</p>)}
                    <DropDownBox selectItems={this.state.selectItems} remove={handleRemove}/>
                    <div className='dropDownX' onClick={deselectAll}>
                        <RiCloseLine />
                    </div>
                </div>
                {
                    (this.state.focused) && <div className='test2'>
                        {
                            this.state.selectItems.map((item) => (
                                <DropDownItem key={item.value} text={item.text} value={item.value} selected={item.selected} onSelect={handleSelect} />
                            ))
                        }
                    </div>
                }
            </div>
        )
    }
}

export default DropDown;