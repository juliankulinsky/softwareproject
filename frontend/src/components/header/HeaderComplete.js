import React, {Component} from 'react';
import {AppBar, Container, Avatar, ThemeProvider, Toolbar, Typography} from "@material-ui/core";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ChatIcon from "@material-ui/icons/Chat";
import {Link} from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import GroupIcon from "@material-ui/icons/Group";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import ProfileDropDown from "../dialogs/ProfileDropDown";
import "./theme.css";
import {Person} from "@material-ui/icons";

class HeaderComplete extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {user} = this.props;
        return (
            <>
                <div>
                    <AppBar className="root" position="sticky">
                        <Toolbar className="toolbar">
                            <div className="imagediv">
                                <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Logo" className="image"/>
                            </div>

                            <div>
                                <div className="icons">
                                <Link to="/partnervorschlaege">
                                    <BottomNavigationAction label={"Explore"} icon={<SearchIcon className="iconcss"/>}/>
                                </Link>

                                <Link to="/partnerexplorer">
                                    <BottomNavigationAction label={"PartnerExplorer"} icon={<PersonAddIcon className="iconcss"/>}/>
                                </Link>

                                <Link to="/konversationen">
                                    <BottomNavigationAction label={"Konversationen"} icon={<ChatIcon className="iconcss"/>}/>
                                </Link>
                                </div>

                                <div className="icons">
                                <Link to="/lerngruppen">
                                    <BottomNavigationAction label={"Gruppen"} icon={<GroupIcon className="iconcss"/>}/>
                                </Link>

                                <Link to="/personen">
                                    <BottomNavigationAction label={"Person"} icon={<PersonIcon className="iconcss"/>}/>
                                </Link>
                                </div>
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