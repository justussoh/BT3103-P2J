import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { push as Menu, State } from "react-burger-menu";
import './SliderMenu.css';



type MyProps = {
    open: boolean,
    handleMenu: (arg0: boolean) => void,
    handleClickQuestion: (arg0: number) => void,
    handleMenuStateChange: (arg0: State) => void,
};
class SliderMenu extends React.Component<MyProps, {}> {

    render() {
        const questions = [
            '01. Question',
            '02. Question'
        ]

        const listQuestions = questions.map((q, i) =>
            <Grid item xs={12} onClick={() => this.props.handleClickQuestion(i)}>
                {q}
            </Grid>
        );


        return (
            <Menu pageWrapId={"page-wrap"} outerContainerId={"root"}
                customBurgerIcon={false} isOpen={this.props.open}
                onStateChange={(state) => this.props.handleMenuStateChange(state)}
                customCrossIcon={false} className='menu-width'
            >
                <Grid container spacing={3}
                >
                    <Grid item xs={12} className='d-flex align-items-center'>
                        <IconButton className='closeButtonMenu ml-auto' onClick={() => this.props.handleMenu(false)}>
                            <CloseIcon className='closeIconMenu' />
                        </IconButton>
                    </Grid>
                    {listQuestions}
                </Grid>

            </Menu>
        )

    }
}

export default SliderMenu;