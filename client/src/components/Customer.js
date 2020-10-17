import React from 'react';
import {TableCell,TableRow  } from '@material-ui/core';

const Customer=(props)=>{
    const {name, id, image,birthday,gender,job}=props.customers;

    return(
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell align="right"><img src={image} alt="profile"/></TableCell>
            <TableCell align="right">{name}</TableCell>
            <TableCell align="right">{birthday}</TableCell>
            <TableCell align="right">{gender}</TableCell>
            <TableCell align="right">{job}</TableCell>
        </TableRow>
    );
}

export default Customer;
