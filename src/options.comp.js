import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const options = [
    '9am-10am',
    '10am-11am',
    '11am-12pm',
    '12-pm-01pm',
    '01pm-02pm',
    '02pm-03pm',
    '03pm-04pm',
    '04pm-05pm'
]

const Option = props => {
    return <ListGroupItem
        //className={props.active && 'active'}
        value={props.idx}
        onClick={e => {
            e.preventDefault();
            +e.target.value > -1 && props.onOptionSelect(+e.target.value)
        } }
        bsStyle={props.active ? 'danger' : 'success'}
        >{props.text}</ListGroupItem>
}

const OptionsListing = props => {
    let opts;
    if (!props.appointments.sets) {
        opts = <Option text="No Options to Display" idx="-1" />;
    } else {
        opts = options.map(function (text, idx) {
            let opt = <Option
                active={props.appointments.sets[idx]}
                idx={idx.toString()}
                key={idx.toString()}
                text={text}
                onOptionSelect={props.onOptionSelect}
                />

            return opt;
        }, props);
    }

    return <ListGroup>{opts}</ListGroup>
}

export { options };
export default OptionsListing;
