import React from 'react';
import CardView from '../components/CardView';
import { makeStyles } from "@material-ui/core/styles";


const InstarMain = () =>{
    return (
        <div>
            <h2>
                여기는 인스타
            </h2>
            <div>
                <CardView/>
                <CardView/>
            </div>
        </div>
    );
}

export default InstarMain;