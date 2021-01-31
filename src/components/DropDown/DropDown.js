// React import
import React from 'react'

import DropDownBox from './components/DropDownBox';
import DropDownItem from './components/DropDownItem';

class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.container = React.createRef(); // This is a ref to the overall dropdown, to detect when focus shifts outside.
        this.state = { 
            focused: false,
            selectedItems : []
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
            if (!result.selected) {
                if (this.state.selectedItems.some((item) => item.value === result.value)) {
                    this.setState({...this.state, 
                        selectedItems: this.state.selectedItems.filter((item) => item.value !== result.value)});
                }
            } else {
                if (!this.state.selectedItems.some((item) => item.value === result.value)) {
                    this.state.selectedItems.push({
                        text: result.text,
                        value: result.value
                    });
                    this.setState({...this.state});
                }
            }
        }
        return (
            <div ref={(container) => this.container = container} className='testx'>
                <div className='test1' >
                    <p onClick={() => this.setState({...this.state, focused: !this.state.focused})}>This is my test</p>
                    <DropDownBox selectedItems={this.state.selectedItems} remove={handleSelect}/>
                </div>
                {
                    (this.state.focused) && <div className='test2'>
                        <DropDownItem text='Cantrip' value={0} select={handleSelect}/>
                        <DropDownItem text='1st level' value={1} select={handleSelect}/>
                        <DropDownItem text='2nd Level' value={2} select={handleSelect}/>
                    </div>
                }
            </div>
        )
    }
}

export default DropDown;