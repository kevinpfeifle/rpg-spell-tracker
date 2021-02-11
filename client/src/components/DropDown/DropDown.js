// React import
import React from 'react'

// React Icons imports
import { RiCloseLine } from "react-icons/ri";

// Internal Dropdown imports
import DropDownBox from './components/DropDownBox';
import DropDownItem from './components/DropDownItem';

/**
 * DropDown is a react component that create a mutli-select dropdown form.
 * @param {Array} props.selectItems array of select items for the drop down formatted as follows: [{selected: [Boolean], text: [String], value: [Value]}]
 * @param {Function} props.updateSelect the handling function to be called whenever the selected values are updated, assumes the following parameters (selectName, selectCount, selectItems)
 * @param {String} props.name the string defaulting the type of dropdown as well as the default text.
 */
class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.container = React.createRef(); // This is a ref to the overall dropdown, to detect when focus shifts outside.
        this.state = { 
            focused: false,
            selectCount: 0, // Keeps a tab on the number of items selected, to easily inform consumer the count of selected items without searching.
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
    /**
     * Function passed into each dropdown item, sets state of the current array of selected items.
     * Updates the consumer after the state change has been made via prop updateSelect function.
     * @param {Object} result the selected item from the dropdown.
     */
    handleSelect = (result) => {
        let alteredIndex = this.state.selectItems.findIndex((item) => item.value === result.value);
        let updatedItems = this.state.selectItems;
        let newCount = (result.selected) ? this.state.selectCount + 1 : this.state.selectCount - 1;
        updatedItems[alteredIndex].selected = result.selected;
        this.setState({
            ...this.state,
            selectCount: newCount,
            selectItems: updatedItems
        }, () => {
            this.props.updateSelect(this.props.name, this.state.selectCount, this.state.selectItems);
        });
    }

    /**
     * Function similar to handleSelect, but used to remove items, and removes the focus.
     * Updates the consumer after the state change has been made via prop updateSelect function.
     * @param {Object} result the selected item from the dropdown.
     */
    handleRemove = (result) => {
        let alteredIndex = this.state.selectItems.findIndex((item) => item.value === result.value);
        let updatedItems = this.state.selectItems;
        let newCount = this.state.selectCount - 1;
        updatedItems[alteredIndex].selected = result.selected;
        this.setState({
            focused: false,
            selectCount: newCount,
            selectItems: updatedItems
        }, () => {
            this.props.updateSelect(this.props.name, this.state.selectCount, this.state.selectItems);
        });
    }

    /**
     * Function to set all select items as false/unselected. Removes focus.
     * Updates the consumer after the state change has been made via prop updateSelect function.
     * @param {Event} e the onclick event passed from the component which was called.
     */
    deselectAll = (e) => {
        e.stopPropagation(); // Ensures clicking this subcomponent does not trigger parent onclick.
        let updatedItems = this.state.selectItems;
        updatedItems.forEach((item) => {
            item.selected = false;
        });
        this.setState({
            focused: false,
            selectCount: 0,
            selectItems: updatedItems
        }, () => {
            this.props.updateSelect(this.props.name, this.state.selectCount, this.state.selectItems);
        });
    }

    render() {
        return (
            <div ref={(container) => this.container = container} className='dropDown'>
                <div className='dropDownContainer' onClick={() => this.setState({...this.state, focused: !this.state.focused})}>
                    {!this.state.selectItems.some((item) => item.selected) && (<p>{this.props.name}</p>)}
                    <DropDownBox selectItems={this.state.selectItems} remove={this.handleRemove}/>
                    <div className='dropDownX' onClick={this.deselectAll}>
                        <RiCloseLine />
                    </div>
                </div>
                {
                    (this.state.focused) && <div className='dropDownList'>
                        {
                            this.state.selectItems.map((item) => (
                                <DropDownItem key={item.value} text={item.text} value={item.value} selected={item.selected} onSelect={this.handleSelect} />
                            ))
                        }
                    </div>
                }
            </div>
        )
    }
}

export default DropDown;