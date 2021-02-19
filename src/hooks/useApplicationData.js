import { useReducer, useEffect } from 'react';

const axios = require('axios').default;

const SET_DAY = "SET_DAY"; 
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW"; 
const UPDATE_SPOTS = "UPDATE_SPOTS";

export function useApplicationData() {

  function reducer(state, action) {
    const { day, days, appointments, interviewers, id, interview } = action;
    switch (action.type) {
      case SET_DAY: {
        return { ...state, day };
      }
      case SET_APPLICATION_DATA: {
        return { ...state, days, appointments, interviewers };
      }
      case SET_INTERVIEW: { 
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        return { ...state, appointments };
      }
      case UPDATE_SPOTS: {
        return { ...state, days };
      }
      default: throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
    }
  }

  // initial state of scheduler appw
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday", 
    days: [],
    appointments: {}, 
    interviewers: {}
  });

  // sets the day to the selected day
  const setDay = (day) => {
    dispatch({ type: SET_DAY, day}); 
  };

  // api call to retrieve data for days, appointments and interviewers
  // updates the state with the response data
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA, 
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
    });
  }, []);

  // books a new interview
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });
      updateSpots();
    })
  }

  // cancels an interview
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
      updateSpots();
    })
  }

  // updates the spots remaining 
  function updateSpots() {
    axios.get('/api/days')
    .then((response) => {
     dispatch({ type: UPDATE_SPOTS, days: response.data })
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
