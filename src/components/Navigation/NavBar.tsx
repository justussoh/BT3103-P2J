import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/MenuRounded';
import React from 'react';
import { Navbar } from 'react-bootstrap';


type MyProps = {
    handleMenu: (arg0: boolean) => void,
};
class NavBar extends React.Component<MyProps, {}> {

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

