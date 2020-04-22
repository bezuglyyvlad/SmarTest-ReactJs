import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {DialogCreator} from "../../common/UIElements";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {num2str} from "../../../utils/utils";

const SubcategoriesListItem = ({value, startTest}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const testInfo = `${value.time} ${num2str(value.time, ['хвилина', 'хвилини', 'хвилин'])} - 
        ${value.count_of_questions} ${num2str(value.time, ['питання', 'питання', 'питань'])}`;
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
                <DialogCreator open={open} handleClose={handleClose} title='Початок тесту'
                               text={`Ви дійсно хочете розпочати тест "${value.name}" (${testInfo})?`}
                               confirmButton={
                                   <Button onClick={() => startTest(value.subcategory_id)} color="primary">
                                       Так
                                   </Button>}/>
                : <DialogCreator open={open} handleClose={handleClose} title='Продовження тесту'
                                 text={`У вас вже розпочато тест "${value.name}" (закінчитися ${(new Date(value.test.date_finish)).toLocaleString()}). Хочете його продовжити?`}
                                 confirmButton={
                                     <Button component={NavLink} to={`/test/${value.test.test_id}`} color="primary">
                                         Так
                                     </Button>}/>
            }
        </>
    )
}

export default SubcategoriesListItem;