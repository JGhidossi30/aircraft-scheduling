import React from 'react';
import PropTypes from 'prop-types';

const Aircraft = (props) => {
    const {aircraft, index, onClick, utilization, selected} = props;
    const {ident} = aircraft;
    return (
        <div
            className={`aircraft d-flex flex-column cursor ${selected ? 'selected' : ''}`}
            onClick={() => onClick(index)}
        >
            <h3 className="flex-self-center">
                {ident}
            </h3>
            <div className="flex-self-center">
                {`${utilization}%`}
            </div>
        </div>
    );
}

Aircraft.propTypes = {
    aircraft: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    utilization: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
};

export default Aircraft;
