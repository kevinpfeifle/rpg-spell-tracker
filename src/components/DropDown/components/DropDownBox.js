import DropDownSelected from './DropDownSelected';
// import DropDown from '../DropDown';

const DropDownBox = ({selectedItems, remove}) => {
    return (
        <div>
            {
                selectedItems.map(item => (            
                    <DropDownSelected key={item.value} value={item.value} text={item.text} remove={remove}/>
                ))
            }
        </div>
    )
}

export default DropDownBox;