import { memo } from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {Field} from "redux-form";
import {radioButtons, renderCheckbox} from "../../../common/FormElements";

const Answers = memo(({type, data}) => {
    let answers = undefined;
    switch (type) {
        case 1:
            answers = <Field name="answer" component={radioButtons}>
                {data.map((value, key) => (
                    <FormControlLabel key={key} value={String(value.test_answer_id)} control={<Radio/>}
                                      label={value.text}/>))}
            </Field>
            break;
        case 2:
            answers = data.map((value, key) => (
                <Field key={key} name={`answer.${value.test_answer_id}`} component={renderCheckbox}
                       label={value.text}/>))
            break;
        default:
            answers = <></>;
    }
    return answers;
});

export default Answers;