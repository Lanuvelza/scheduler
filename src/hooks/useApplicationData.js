import { useReducer, useEffect } from 'react';

import {
  reducer,
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

const axios = require('axios').default;

export function useApplicationData() {
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
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
