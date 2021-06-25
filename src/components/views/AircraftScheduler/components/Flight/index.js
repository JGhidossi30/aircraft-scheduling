import React from 'react';
import PropTypes from 'prop-types';

const Flight = (props) => {
    const {className, flight, index, onClick} = props;
    const {origin, destination, id, readable_arrival, readable_departure} = flight;
    return (
        <div
            className={`flight ${className} d-flex flex-column cursor`}
            onClick={() => onClick(index)}
        >
            <h3 className="flex-self-center">
                {id}
            </h3>
            <div className="d-flex flex-justify-around">
                <div className="d-flex flex-column flex-items-center">
                    <div>
                        {origin}
                    </div>
                    <div>
                        {readable_departure}
                    </div>
                </div>
                <div className="d-flex flex-column flex-items-center">
                    <div>
                        {destination}
                    </div>
                    <div>
                        {readable_arrival}
                    </div>
                </div>
            </div>
        </div>
    );
}

Flight.propTypes = {
    className: PropTypes.string.isRequired,
    flight: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Flight;
