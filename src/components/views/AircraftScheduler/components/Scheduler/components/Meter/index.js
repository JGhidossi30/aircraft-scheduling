import PropTypes from 'prop-types';
import React from 'react';

const Meter = (props) => {
    const {schedule} = props;
    let startTime = 0;
    const endTime = 86400;
    return (
        <div className="meter">
            {schedule?.map((flight) => {
                const {departuretime, arrivaltime} = flight;
                const idle = departuretime - startTime;
                const scheduled = arrivaltime - departuretime;
                startTime = arrivaltime + 1200;
                return (
                    <>
                        <div className="idle" style={{flex: idle}}/>
                        <div className="scheduled" style={{flex: scheduled}}/>
                        <div className="turnaround" style={{flex: '1200'}}/>
                    </>
                );
            })}
            <div className="idle" style={{flex: `${endTime - startTime}`}}/>
        </div>
    );
}

Meter.propTypes = {
    schedule: PropTypes.array.isRequired,
};

export default Meter;
