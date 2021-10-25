import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {DialogCreator} from "../../../common/UIElements";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";

const ExpertTestsListItem = ({value, startTest}) => {
    const [open, setOpen] = useState(false);

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
                                       <Button onClick={() => startTest(value.id)}>
                                           Так
                                       </Button>}/>
                    : <DialogCreator open={open} handleClose={handleClose} title='Продовження тесту'
                                     text={
                                         `У вас вже розпочато тест "${value.title}" 
                                         (закінчиться ${(new Date(value.test.finish_date))
                                             .toLocaleString()}). Продовжити?`
                                     }
                                     confirmButton={
                                         <Button component={NavLink} to={`/test/${value.test.id}`}>
                                             Так
                                         </Button>}/>
            }
        </>
    )
}

export default ExpertTestsListItem;