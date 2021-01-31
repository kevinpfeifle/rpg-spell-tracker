// React imports
import { useState } from 'react'

const DropDownItem = ({text, value, select}) => {
    const [selected, setSelected] = useState(false);
    const [color, setColor] = useState('#ffffff');
    const onClick = () => {
        if (selected) {
            setSelected(!selected);
            setColor('#ffffff');
            select({
                selected: false,
                text: text,
                value: value
            });
        }
        else {
            setSelected(!selected);
            setColor('#D3D3D3');
            select({
                selected: true,
                text: text,
                value: value
            });
        }
    };
    return (
        <div onClick={onClick} style={{backgroundColor:color}}>
            <p>{text}</p>
        </div>
    )
}

export default DropDownItem;