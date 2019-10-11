import React from 'react';
import MenuIcon from '@material-ui/icons/MenuRounded';
import IconButton from "@material-ui/core/IconButton";
import { Navbar } from 'react-bootstrap';


class NavBar extends React.Component {

    render() {

        return (
            <Navbar fixed='top'>
                <IconButton style={{ color: "white" }} onClick={() => this.props.handleMenu(true)}>
                    <MenuIcon fontSize='large' />
                </IconButton>
            </Navbar>
        );
    }
}

export default NavBar;

