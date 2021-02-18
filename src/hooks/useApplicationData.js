import { useState, useEffect } from 'react';

const axios = require('axios').default;

export function useApplicationData() {
  // initial state of scheduler app
  const [state, setState] = useState({
    day: "Monday", 
    days: [], 
    appointments: {},
    interviewers: {}
  });

  // sets the day to the selected day
  const setDay = (day) => {
    setState({...state, day})
  }; 

  // api call to retrieve data for days, appointments and interviewers
  // updates the state with the response data
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data
      }));
    });
  }, []);

  // books a new interview
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      }); 
    });
  }

  // cancels an interview
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
