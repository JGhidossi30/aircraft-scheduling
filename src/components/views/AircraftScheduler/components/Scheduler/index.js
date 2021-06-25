import React, {Component} from 'react';
import Flight from '../Flight';

export default class Scheduler extends Component {
    render() {
        const {schedule, removeFlight} = this.props;
        return (
            <div className="flex-1 scroll-y px-2">
                <h3>
                    {schedule?.map((flight, index) => (
                        <Flight
                            className="remove"
                            flight={flight}
                            index={index}
                            onClick={() => removeFlight(index)}
                            key={index}
                        />
                    ))}
                </h3>
            </div>
        );
    }
}
