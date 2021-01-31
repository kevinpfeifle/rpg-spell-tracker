
const DropDownSelected = ({value, text, remove}) => {
    return (
        <div onClick={() => remove({
            selected: false,
            value: value
        })}>
            <p>{text}</p>
        </div>
    )
}

export default DropDownSelected;