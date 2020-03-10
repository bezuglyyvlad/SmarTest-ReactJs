import React from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {Field} from "redux-form";
import {radioButton} from "../../../common/FormElements";

const Answers = React.memo(({type, data}) => {
    let answers = undefined;
    switch (type) {
        case 1:
            answers = <Field name="answer" component={radioButton}>
                {data.map((value, key) => (
                    <FormControlLabel key={key} value={value.text} control={<Radio color='primary'/>}
                                      label={value.text}/>))}
            </Field>
            break;
        default:
            answers = <></>;
    }
    return answers;
});

export default Answers;