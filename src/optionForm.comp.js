import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import { isNumber } from 'lodash';

const FieldGroup = ({ id, label, vState, help, ...props }) => {
    return (
        <FormGroup controlId={id} validationState={vState}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            <FormControl.Feedback />
            <HelpBlock>{help}</HelpBlock>
        </FormGroup>
    );
}

const phoneTest = /[0-9\.\-]+/;

const OptionForm = (props) => {
    let appt = isNumber(props.selected) ? props.appointments.data[props.selected] : {};
let phVState = appt.phone ? (phoneTest.test(appt.phone) ? null : 'warning') : null;
    return (
        <div>
            <FieldGroup
                id="fcName"
                label="Name"
                vState={null}
                help=""
                type="text"
                placeholder="Enter name"
                value={appt.name || ""}
                name={props.selected && props.selected.toString()}
                onChange={e => {
                    e.preventDefault()
                    props.onOptionChange({ name: e.target.value, index: e.target.name })
                } }
                />
            <FieldGroup
                id="fcText"
                label="Phone"
                vState={phVState}
                help={phVState && "Are you sure this is a phone number?"}
                type="phone"
                placeholder="Enter phone"
                value={appt.phone || ""}
                name={props.selected && props.selected.toString()}
                onChange={e => {
                    e.preventDefault()
                    props.onOptionChange({ phone: e.target.value, index: e.target.name })
                } }
                />
        </div>
    );
}

export default OptionForm;
