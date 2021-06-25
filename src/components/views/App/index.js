import React from 'react';
import {useToasts} from 'react-toast-notifications';
import AircraftScheduler from '../AircraftScheduler';

const App = () => {
    const {addToast} = useToasts();
    const showError = (message) => {
        addToast(message, {
            appearance: 'error',
            autoDismiss: true,
        });
    }
    return (
        <div className="app">
            <AircraftScheduler
                showError={showError}
            />
        </div>
    );
}

export default App;
