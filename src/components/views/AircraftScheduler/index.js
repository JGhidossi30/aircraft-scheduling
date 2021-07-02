import axios from 'axios';
import React, {Component} from 'react';
import Aircraft from './components/Aircraft';
import Flight from './components/Flight';
import Scheduler from './components/Scheduler';
import Meter from './components/Scheduler/components/Meter';

export default class AircraftScheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aircrafts: [],
            flights: [],
            schedules: [],
            selectedAircraft: 0,
        };
    }

    componentDidMount() {
        const AIRCRAFTS_URL = 'https://infinite-dawn-93085.herokuapp.com/aircrafts';
        const FLIGHTS_URL = 'https://infinite-dawn-93085.herokuapp.com/flights';

        axios.get(AIRCRAFTS_URL)
            .then(response => {
                const {schedules} = this.state;
                schedules.push([]);
                this.setState({
                    aircrafts: response.data,
                    schedules,
                });
            }, error => {
                console.log(error);
            });

        axios.get(FLIGHTS_URL)
            .then(response => {
                this.setState({flights: response.data});
            }, error => {
                console.log(error);
            });
    }

    selectAircraft = (index) => this.setState({selectedAircraft: index});

    hasOverlap = (flight) => {
        const {schedules, selectedAircraft} = this.state;
        let isOverlapped = false;
        schedules[selectedAircraft].forEach((scheduledFlight) => {
            if ((flight.departuretime >= scheduledFlight.departuretime && flight.departuretime <= scheduledFlight.arrivaltime + 1200) ||
                (flight.arrivaltime + 1200 >= scheduledFlight.departuretime && flight.arrivaltime <= scheduledFlight.arrivaltime) ||
                (flight.departuretime <= scheduledFlight.departuretime && flight.arrivaltime >= scheduledFlight.arrivaltime)) {
                isOverlapped = true;
            }
        });
        return isOverlapped;
    }

    isAccurate = (flight) => {
        const {schedules, selectedAircraft} = this.state;
        let precedingFlight = {};

        schedules[selectedAircraft].forEach((scheduledFlight) => {
            if (scheduledFlight.arrivaltime + 1200 <= flight.departuretime) {
                precedingFlight = scheduledFlight;
            }
        });

        return (precedingFlight?.destination || flight.origin) === flight.origin;
    }

    canDelete = (flight) => {
        const {schedules, selectedAircraft} = this.state;
        let precedingFlight = {};
        let subsequentFlight = {};

        const isEmpty = (obj) => Object.keys(obj).length === 0;

        schedules[selectedAircraft].forEach((scheduledFlight) => {
            if (scheduledFlight.arrivaltime + 1200 <= flight.departuretime) {
                precedingFlight = scheduledFlight;
            } else if (isEmpty(subsequentFlight) && flight.arrivaltime + 1200 <= scheduledFlight.departuretime) {
                subsequentFlight = scheduledFlight;
            }
        });

        return (precedingFlight?.destination || true) === (subsequentFlight?.origin || true);
    }

    addFlight = (index) => {
        const {showError} = this.props;
        const {flights, schedules, selectedAircraft} = this.state;
        const {hasOverlap, isAccurate} = this;

        if (!hasOverlap(flights.data[index]) && isAccurate(flights.data[index])) {
            const flight = flights.data.splice(index, 1)[0];
            schedules[selectedAircraft].push(flight);
            schedules[selectedAircraft].sort((a, b) => a.departuretime - b.departuretime);
            this.setState({
                flights,
                schedules,
            });
        } else {
            showError(`Flight ${flights.data[index].id} has a conflict with the current schedule.`);
        }
    }

    removeFlight = (index) => {
        const {showError} = this.props;
        const {flights, schedules, selectedAircraft} = this.state;
        const {canDelete} = this;

        if (canDelete(flights.data[index]) || index === 0 || index === schedules[selectedAircraft].length - 1) {
            const flight = schedules[selectedAircraft].splice(index, 1)[0];
            flights.data.push(flight);
            flights.data.sort((a, b) => {
                if (a.id < b.id) return -1;
                if (a.id > b.id) return 1;
                return 0;
            });
            this.setState({
                flights,
                schedules,
            });
        } else {
            showError(`Flight ${flights.data[index].id} has a conflict with the current schedule.`);
        }
    }

    calculateUtilization = (schedule) => {
        let servicedTime = 0;
        schedule?.forEach((flight) => servicedTime += flight.arrivaltime - flight.departuretime + 1200);
        return Math.round((servicedTime / 86400) * 100);
    }

    render() {
        const {aircrafts, flights, schedules, selectedAircraft} = this.state;
        const {selectAircraft, addFlight, removeFlight, calculateUtilization} = this;
        const currentAircraft = aircrafts.length !== 0 ? aircrafts?.data[selectedAircraft] : {};
        const utilization = calculateUtilization(schedules[selectedAircraft]);
        return (
            <div className="aircraft-scheduler">
                <div className="aircrafts px-5">
                    <h3 className="text-align-center">
                        Aircrafts
                    </h3>
                    <div className="flex-1 scroll-y px-2 pb-1">
                        {aircrafts.data?.map((aircraft, index) => (
                            <Aircraft
                                aircraft={aircraft}
                                index={index}
                                onClick={selectAircraft}
                                utilization={utilization}
                                selected={selectedAircraft === index}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex-1 d-flex flex-column ml-5 mr-5">
                    <h3 className="text-align-center border-bottom">
                        {`Rotation ${currentAircraft.ident}`}
                    </h3>
                    <Scheduler
                        aircraft={currentAircraft}
                        schedule={schedules[selectedAircraft]}
                        removeFlight={removeFlight}
                    />
                    <Meter
                        schedule={schedules[selectedAircraft]}
                    />
                </div>
                <div className="flights d-flex flex-column px-5">
                    <h3 className="text-align-center">
                        Flights
                    </h3>
                    <div className="flex-1 scroll-y px-2 pb-1">
                        {flights.data?.map((flight, index) => (
                            <Flight
                                className="add"
                                flight={flight}
                                index={index}
                                onClick={addFlight}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
