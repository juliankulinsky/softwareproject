import React, {Component} from 'react';
import {AppBar, BottomNavigation, ThemeProvider, Toolbar} from "@material-ui/core";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {Image} from "@material-ui/icons";
import ChatIcon from "@material-ui/icons/Chat";
import {Link} from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import GroupIcon from "@material-ui/icons/Group";
import theme from "./theme";
import ProfileDropDown from "../dialogs/ProfileDropDown";

class HeaderComplete extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                <AppBar position="sticky" style={theme.root}>
                    <Toolbar style={theme.main}>
                            <Link to="/studoo/partnervorschlaege">
                                <BottomNavigationAction label={"Explore"} icon={<SearchIcon style={theme.iconcss} />}  />
                            </Link>

                            <Link to="/studoo/nachrichten">
                                <BottomNavigationAction label={"Nachrichten"} icon={<ChatIcon style={theme.iconcss}/>}  />
                            </Link>

                            <Link to="/studoo/gruppen">
                                <BottomNavigationAction label={"Gruppen"} icon={<GroupIcon style={theme.iconcss} />}  />
                            </Link>
                    </Toolbar>

                </AppBar>
            </div>
        );
    }
}

export default HeaderComplete;