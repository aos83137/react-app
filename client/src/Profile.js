import React from 'react';

const Profile=(props)=>{
    const { name, age, love } = props.data;
    return(
        <div>
            <dt>Name</dt><dd>{name}</dd>
            <dt>Age</dt><dd>{age}</dd>
            <dt>Love</dt><dd>{love}</dd>
        </div>
    );
}

export default Profile;