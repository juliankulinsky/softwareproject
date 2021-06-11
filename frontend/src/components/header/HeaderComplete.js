import React, {Component} from 'react';
import {AppBar, BottomNavigation, Avatar, ThemeProvider, Toolbar, Typography} from "@material-ui/core";
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
        const {user} = this.props;
        return (
            <>
                <div>
                    <AppBar position="sticky" style={theme.root}>
                        <Toolbar style={theme.toolbar}>
                            <div style={theme.imagediv}>
                                <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Logo" style={theme.image}/>
                            </div>

                            <div>
                                <Link to="/partnervorschlaege">
                                    <BottomNavigationAction label={"Explore"} icon={<SearchIcon style={theme.iconcss}/>}/>
                                </Link>

                                <Link to="/nachrichten">
                                    <BottomNavigationAction label={"Nachrichten"} icon={<ChatIcon style={theme.iconcss}/>}/>
                                </Link>

                                <Link to="/lerngruppen">
                                    <BottomNavigationAction label={"Gruppen"} icon={<GroupIcon style={theme.iconcss}/>}/>
                                </Link>
                                <Link to="/personen">
                                    <BottomNavigationAction label={"Personen"} icon={<GroupIcon style={theme.iconcss}/>}/>
                                </Link>
                            </div>

                            <div>
                            <ProfileDropDown user={user} />
                            </div>

                        </Toolbar>
                    </AppBar>
                </div>
            </>
        );
    }
}

export default HeaderComplete;