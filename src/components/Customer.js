import React from 'react';

const Customer=(props)=>{
    return(
        <div>
            <CustomerProfile customers={props.customers}></CustomerProfile>
            <CustomerInfo customers={props.customers}></CustomerInfo>
        </div>
        
    );
}

const CustomerProfile =(props)=>{
    const {name, id, image}=props.customers;

    return(
        <div>
            <img src={image} alt="profile"/>
            <h2>{name}({id})</h2>
        </div>
    )
}

const CustomerInfo =(props)=>{
    const {birthday,gender,job}=props.customers;

    return(
        <div>
            <p>{birthday}</p>
            <p>{gender}</p>
            <p>{job}</p>
        </div>
    )
}
export default Customer;
