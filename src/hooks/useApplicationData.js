import { useReducer, useEffect } from 'react';

const axios = require('axios').default;

const SET_DAY = "SET_DAY"; 
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW"; 

export function useApplicationData() {
  // initial state of scheduler appw
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday", 
    days: [],
    appointments: {}, 
    interviewers: {}
  });
  
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
          interview: interview && { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const days = updateSpots(state.day, state.days, appointments);
        
        return { ...state, appointments, days };
      }
      default: throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
    }
  }
  
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
    
    // Connect to Websocket
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    
    ws.onmessage = function(event) {
      const { type, id, interview } = JSON.parse(event.data); 
      if (type === "SET_INTERVIEW") {
        dispatch({ type: type, id: id, interview: interview }); 
      }
    }
    return () => ws.close();
  }, []);
  
  // books a new interview
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    })
  }
  
  // cancels an interview
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    })
  }
  
  // updates spots remaining by counting the number of null interviews
  function updateSpots(day, days, appointments) {
    const dayObj = days.filter(dayElement => dayElement.name === day); 
    const spots = dayObj[0].appointments.filter(e => appointments[e].interview === null).length;
    const newDayObj = { ...dayObj[0], spots }
    const newArray =  days.map(item => item.name === day ? newDayObj : item);
    return newArray;
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
