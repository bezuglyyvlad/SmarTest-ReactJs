import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {DialogCreator} from "../../../common/UIElements";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const ExpertTestsListItem = ({value, startTest}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ListItem button onClick={handleClickOpen}>
                <ListItemAvatar>
                    <Avatar>
                        <SubdirectoryArrowRightIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={value.title}/>
            </ListItem>
            {
                !value.test ?
                    <DialogCreator open={open} handleClose={handleClose} title='Старт тесту'
                                   text={`Ви дійсно хочете розпочати тест "${value.title}"?`}
                                   confirmButton={
                                       <Button onClick={() => startTest(value.id)} color="primary">
                                           Так
                                       </Button>}/>
                    : <DialogCreator open={open} handleClose={handleClose} title='Продовження тесту'
                                     text={
                                         `У вас вже розпочато тест "${value.title}" 
                                         (закінчиться ${(new Date(value.test.finish_date))
                                             .toLocaleString()}). Продовжити?`
                                     }
                                     confirmButton={
                                         <Button component={NavLink} to={`/test/${value.test.id}`} color="primary">
                                             Так
                                         </Button>}/>
            }
        </>
    )
}

export default ExpertTestsListItem;