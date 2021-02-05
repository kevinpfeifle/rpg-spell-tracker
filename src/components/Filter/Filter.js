import DropDown from '../DropDown/DropDown';

import React from 'react'

/** 
 * Component which creates flexible filter UIs. The filter objects passed into the components are expected to be in the following format (DropDown filter as example):
 * {
 *      name: 'Filter Name',
 *      filterType: 'Select',
 *      filter: {
 *          selectCount: 0,
 *          selectItems: [Selection Items]
 *      }
 * }
 * @param {Array} props.filters array of filter objects to be used in creating the filter.
 * @param {Function} props.filterFunc function to be called whenever a filter is updated, used to update the UI and filter components out/in.
 * @returns the created component.
 */
class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            filters: this.props.filters
        };
    }
    
    /**
     * Function to make changes to the stored filter state for a DropDown component. Calls the prop filter function after state is set. 
     * @param {String} name name of the selection component
     * @param {Number} selectCount running tally of items selected
     * @param {Array} selectItems array of objects for the selection component
     */
    handleFilterUpdate = (name, selectCount, selectItems) => {
        let updatedFilters = JSON.parse(JSON.stringify(this.state.filters));
        for (let filter of updatedFilters) {
            if (filter.name === name) {
                filter.filter.selectCount = selectCount;
                filter.filter.selectItems = selectItems;
            }
        }
        this.setState({
            ...this.state,
            filters: updatedFilters
        }, () => {
            this.props.filterFunc(this.state.filters);
        });
    }

    /**
     * Function to make changes to the stored filter state for a Text Input component. Calls the prop filter function after state is set. 
     * @param {Object} event the event passed from the Input component onChange.
     */
    handleTextUpdate = (event) => {
        let updatedFilters = JSON.parse(JSON.stringify(this.state.filters));
        for (let filter of updatedFilters) {
            if (filter.name === event.target.name) {
                filter.filter.textValue = event.target.value;
            }
        }
        this.setState({
            ...this.state,
            filters: updatedFilters
        }, () => {
            this.props.filterFunc(this.state.filters);
        });
    }

    render() {
        return (
            <div className='Filter'>
                {
                    // Maps each of the filters into a UI component in order of the provided array.
                    this.state.filters.map((filter) => {
                        if (filter.filterType === 'select') {
                            return (<DropDown key={filter.name} name={filter.name} updateSelect={this.handleFilterUpdate} selectItems={filter.filter.selectItems} />)
                        } else if (filter.filterType === 'input') {
                            return (<input key={filter.name} type="text" value={filter.filter.textValue} name={filter.name} placeholder={filter.name} onChange={this.handleTextUpdate} />)
                        } else return null;
                    })
                }
            </div>
        )
    }
}

export default Filter;