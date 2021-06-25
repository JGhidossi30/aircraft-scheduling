# Assumptions 

The goal of this project was to fetch data from two APIs and manipulate it locally. As I approached this project, I started by determining how I would want to handle the schedules since I would not be touching APIs aside from getting the *aircrafts* and *flights*.

I decided that for each aircraft available, I would create a *schedule* array directly associated with the aircraft by index and maintain it in the store of the AircraftScheduler component. I had thought about implementing Redux for this, but due to time constraints it seemed unnecessary.

With the first (and only) aircraft selected by default, the user is able to select any flight they choose and it will be automatically added to the corresponding aircraft's schedule. If the flight has a conflict with the current schedule, it will not be added and a toast message will be displayed (installed from *react-toast-notifications*).

The scheduler displays the flights chronologically with a horizontal bar below displaying the flights graphically. If the flights are selected from the scheduler, they will be removed and put back in the flights list.

There are many UI/UX pieces of this project that could be improved upon in further iterations, but this minimum viable product should meet the requirements as expected.

# Run the project

To run this project, after cloning the code you must run:

### `npm install`

Then run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.
