import DropDownSelected from './DropDownSelected';
// import DropDown from '../DropDown';

const DropDownBox = ({selectItems, remove}) => {
    return (
        <div className='dropDownBox'>
            {
                selectItems.map(item => (            
                    (item.selected) && <DropDownSelected key={item.value} value={item.value} text={item.text} remove={remove}/>
                ))
            }
        </div>
    )
}

export default DropDownBox;