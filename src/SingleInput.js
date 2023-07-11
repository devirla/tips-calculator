import React from "react";

function SingleInput(props) {

    return(
        <div className={props.className}>
            <div className="label_box">
                <label htmlFor="inputLabel" className={props.labelClassName}>{props.text}</label>
                <label className="error_field">Can't be zero</label>
            </div>
            <input name="inputLabel" className={props.inputClassName} 
                value={props.value} 
                onChange={props.onChange} 
            />
        </div>
    )
}

export default SingleInput;