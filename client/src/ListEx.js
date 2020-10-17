import React from 'react';

const ListEx = (props) =>{

    const listItems = props.data.map(
        (text,index) => {
            return <li>{index} : {text}</li>
        }
    )

    return(
        <ul>
            {listItems}
        </ul>
    )
}

export default ListEx;