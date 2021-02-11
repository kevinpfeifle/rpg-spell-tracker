// React imports
import { useState } from 'react'

const DropDownItem = ({text, value, selected, onSelect}) => {
    const [color, setColor] = useState((selected) ? '#D3D3D3' : '#ffffff');
    const onClick = () => {
        if (selected) setColor('#ffffff');
        else setColor('#D3D3D3');
        onSelect({
            selected: !selected,
            text: text,
            value: value
        });
    };
    return (
        <div className='dropDownItem' onClick={onClick} style={{backgroundColor:color}}>
            <p>{text}</p>
        </div>
    )
}

export default DropDownItem;