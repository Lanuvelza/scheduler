# Interview Scheduler

Interview scheduler app built on React. Each day holds up to five appointments. Users can edit, delete or book between days. Data is retrieved from an API server using PostgreSQL database. 

## Features 
 - Displays the appointment days (Monday to Friday) and the number of slots remaining for each day 
 - Users can view which timeslots are booked and the details of that information by clicking a specific day 
 - Users can book an interview by typing their name and selecting an interviewer from a list of interviewers on that given day 
 - Users can edit their booked interview information by selecting the edit icon of a booked interview 
 - Users can cancel a booked interview by pressing confirm on a pop-up message before deleting the interview timeslot

## Additional Features

- added websockets such that booked and deleted appointments will sync across multiple clients.

## Tech Stack 

Front-End: React, JSX, HTML, SCSS, JS 

Back-End: Express, Axios, Node.js, PostgresQL 

Testing: Jest, Storybook, Cypress, React Testing Library 

# Final Product 

## Main Page

!["screenshot of Main Page"](https://github.com/Lanuvelza/scheduler/blob/master/doc/main-page.png?raw=true)

## Creating an appointment 

!["screenshot create appointment"](https://github.com/Lanuvelza/scheduler/blob/master/doc/create-appointment.png?raw=true)

!["screenshot created appointment"](https://github.com/Lanuvelza/scheduler/blob/master/doc/created-appointment.png?raw=true)

## Deleting an appointment 

!["screenshot delete appointment"](https://github.com/Lanuvelza/scheduler/blob/master/doc/delete-appointment.png?raw=true)

!["screenshot confirmation"](https://github.com/Lanuvelza/scheduler/blob/master/doc/delete-confirm.png?raw=true)

!["screenshot deleted appointment"](https://github.com/Lanuvelza/scheduler/blob/master/doc/deleted-appointment.png?raw=true)


## Setup

Install dependencies with `npm install`.

 Both the client and the API server applications must be running for full functionality. 

## Running Webpack Development Server

```sh
npm start
```
## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Setting up API Server/Database 

Fork and clone the [scheduler-api server](https://github.com/lighthouse-labs/scheduler-api) and follow the steps in the README

## Dependencies 
- Axios
- Classnames 
- Normalize.css 
- React 
- React-dom 
- React-scripts 
- Babel/core
- Storybook/addon-actions
- Storybook/addon-backgrounds
- Storybook/addon-links
- Storybook/addons
- Storybook/react
- Testing-library/jest-dom
- Testing-library/react
- Testing-library/react-hooks
- Babel-loader
- Node-sass
- Prop-types
