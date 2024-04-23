import { useState } from "react";
import classes from "./ManagePracticeBank.module.css";

const ManagePracticeBank = (props) => 
{
    const [keys, setKeys] = useState(props.practiceBank.keys);
    const [values, setValues] = useState(props.practiceBank.values);
    const [btnIsSelected, setBtnIsSelected] = useState(Array(props.practiceBank.keys.length).fill(false));
    const countTrueValues = btnIsSelected.filter(value => value === true).length;

    function handleBtnClick(incomingIndex)
    {
        btnIsSelected[incomingIndex] = (btnIsSelected[incomingIndex] === true ? false : true);
        setBtnIsSelected([...btnIsSelected]);
    }

    function handleRemoveAndExit()
    {
        let updatedKeys = [];
        let updatedValues = [];
        btnIsSelected.forEach((isSelected, index)=>
        {
            if(isSelected === false)
            {
              updatedKeys.push(keys[index]);
              updatedValues.push(values[index]);
            }

        });
        props.onNewPracticeBank([[...updatedValues],[...updatedKeys],]);

        props.onSelectedCheckpoint(null);
    }

    return (
        <>
            <h3 className={classes.title}>Add/Remove Practice Bank Examples</h3>
            <div className={classes.keyValContainer}>
            <div className={classes.selectedCounter}>{countTrueValues} / {keys.length} Selected for Removal</div>
            {keys.map((keyString, index)=>(<button className={btnIsSelected[index] === true ? classes.btnSelected : classes.keyBtns} onClick={()=>{handleBtnClick(index)}}><span className={classes.keyString}>{keyString}</span><span></span><span>{values[index]}</span></button>))}
            </div>
            <button onClick={handleRemoveAndExit}>Remove Examples and Exit</button>
        </>
    )
}
 export default ManagePracticeBank;