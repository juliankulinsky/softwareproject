import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChatIcon from '@material-ui/icons/Chat';
import GroupIcon from '@material-ui/icons/Group';
import SearchIcon from '@material-ui/icons/Search';
import ProfileDropDown from '../dialogs/ProfileDropDown';
import {Link as RouterLink} from "react-router-dom";


const Header = () => {
    const [user, setUser] = useState([]);





    return (
        <>
        <ProfileDropDown setUser={user} use={user}/>
        {
          user ?
            <Tabs indicatorColor='primary' textColor='primary' centered >
              <Tab label='Partnervorschläge' component={RouterLink} to={`/studoo/partnervorschlaege`} />
              <Tab label='Nachrichten' component={RouterLink} to={`/studoo/nachrichten`} />
              <Tab label='About' component={RouterLink} to={`/about`} />
            </Tabs>
            : null
        }
        </>
    )
}

export default Header;

