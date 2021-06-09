import React, { useState } from 'react';
import Navbar from "./Navbar";
import ProfileDropDown from "./ProfileDropDown";

const HeaderComplete = () => {
    const [user, setUser] = useState()

    return (
        <Container>
            <LogoComponent />
            <Navbar />
            <ProfileDropDown user={user} />
        </Container>
    )
}

export default HeaderComplete;