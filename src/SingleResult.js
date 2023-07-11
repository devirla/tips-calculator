import React from "react";

function SingleResult(props) {

    return(
        <div className='singleResultBox'>
            <div className='singleResultBox__title'>{props.text}<p>/ person</p></div>
            <div className='singleResultBox__result'>${props.result}</div>
        </div>
    )
}

export default SingleResult;