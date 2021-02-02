// React Icons imports
import { RiCloseLine } from "react-icons/ri";

const DropDownSelected = ({value, text, remove}) => {
    const removeItem = (e) => {
        e.stopPropagation(); // Ensures clicking this subcomponent does not trigger parent onclick.
        remove({
            selected: false,
            text: text,
            value: value
        });
    }
    return (
        <div className='dropDownSelected'>
            <p>{text}</p>
            <div className='dropDownSelectedX' onClick={removeItem}>
                <RiCloseLine id='dropDownSelectedXButton'/>
            </div>
        </div>
    )
}

export default DropDownSelected;