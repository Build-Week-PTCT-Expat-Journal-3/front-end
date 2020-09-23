import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import {ProfileForm} from './ProfileForm';
import {ProfileInfo} from './ProfileInfo';

export const Profile = () => {
    const [edit, setEdit] = useState(!true);
    return (
        <div>
            <Link to={"/protected"}>Dashboard</Link>
            {edit !== true && 
            <div>
                <ProfileInfo />
                <Button variant='contained' onClick={() => setEdit(true)}>Edit</Button>
            </div>}
            {edit === true &&
            <div>
                <ProfileForm />
                <Button variant='contained' color='primary' onClick={() => setEdit(!true)}>Edit</Button>
            </div>}
            
        </div>
    )
}