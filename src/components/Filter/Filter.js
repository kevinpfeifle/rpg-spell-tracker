import DropDown from '../DropDown/DropDown';

import React from 'react'

/** 
 * {
 *      name: 'Filter Name',
 *      filterType: 'Select',
 *      filter: {
 *          selectCount: 0,
 *          selectItems: [Selection Items]
 *      }
 * }
 * 
 */
class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            filters: this.props.filters
        };
    }
    
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