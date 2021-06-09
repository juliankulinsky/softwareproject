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
import {Container} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    borderWidth: 1,
    borderColor: '#000',
  },
});


const HeaderNew = () => {
    const [user, setUser] = useState([]);
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            {
              user ?
              <Paper className={classes.root}>
                   <Container>
                       <Tabs indicatorColor='primary' textColor='primary' centered value={value} onChange={handleChange}>
                          <Tab icon={<SearchIcon />} label='Explore' component={RouterLink} to={`/studoo/partnervorschlaege`} />
                          <Tab icon={<ChatIcon />} label='Messages' component={RouterLink} to={`/studoo/nachrichten`} />
                          <Tab icon={<GroupIcon />} label='Groups' component={RouterLink} to={`/about`} />
                       </Tabs>
                       <Tabs indicatorColor='primary' textColor='primary' right value={value}>
                           <Tab component={ProfileDropDown} user={user} />
                       </Tabs>
                   </Container>
              </Paper>
              : null
            }
        </>
    )
}

export default HeaderNew;

