import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {DialogCreator} from "../../common/UIElements";

const SubcategoriesListItem = ({value, startTest}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const testInfo = `${value.time} минут - ${value.count_of_question} вопросов`;
    const dialogText = `Вы действительно хотите начать тест "${value.name}" (${testInfo})?`;
    return (
        <>
            <ListItem button onClick={handleClickOpen}>
                <ListItemAvatar>
                    <Avatar>
                        <SubdirectoryArrowRightIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={value.name}
                              secondary={testInfo}/>
            </ListItem>
            <DialogCreator open={open} handleClose={handleClose} title='Начало теста' text={dialogText}
                           actionConfirm={() => startTest(value.subcategory_id)}/>
        </>
    )
}

export default SubcategoriesListItem;