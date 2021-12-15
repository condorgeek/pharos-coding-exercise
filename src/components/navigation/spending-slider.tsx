import React, {FC, useState} from "react";

export const MAX_SPENDING = 100000;

const SpendingSlider: FC<{ onSpendingChange: (amount: number) => void }> = ({onSpendingChange}) => {
    const [value, setValue] = useState(MAX_SPENDING);

    const onChange = (event: any) => {
        event.preventDefault();
        setValue(event.target.value);
    }

    const onMouseUp = (event: any) => {
        event.preventDefault();
        onSpendingChange(value);
    }

    return <div className='navigation-slider'>
        <h4>Spending {value}</h4>

        <input type="range" min='0' max={MAX_SPENDING} step='10000'
               value={value}
               onChange={onChange}
               onMouseUp={onMouseUp}
               className="slider"/>
    </div>
}

export default SpendingSlider;