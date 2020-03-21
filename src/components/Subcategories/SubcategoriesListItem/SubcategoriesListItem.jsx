import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {DialogCreator} from "../../common/UIElements";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const SubcategoriesListItem = ({value, startTest}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const testInfo = `${value.time} минут - ${value.count_of_questions} вопросов`;
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
            {Array.isArray(value.test) ?
                <DialogCreator open={open} handleClose={handleClose} title='Начало теста'
                               text={`Вы действительно хотите начать тест "${value.name}" (${testInfo})?`}
                               confirmButton={
                                   <Button onClick={() => startTest(value.subcategory_id)} color="primary">
                                       Да
                                   </Button>}/>
                : <DialogCreator open={open} handleClose={handleClose} title='Продолжение теста'
                                 text={`У вас уже начат тест "${value.name}" (закончиться ${(new Date(value.test.date_finish)).toLocaleString()}). Хотите его продолжить?`}
                                 confirmButton={
                                     <Button component={NavLink} to={`/test/${value.test.test_id}`} color="primary">
                                         Да
                                     </Button>}/>
            }
        </>
    )
}

export default SubcategoriesListItem;