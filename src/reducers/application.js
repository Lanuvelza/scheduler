export const SET_DAY = "SET_DAY"; 
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW"; 

export function reducer(state, action) {
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

// updates spots remaining by counting the number of null interviews
function updateSpots(day, days, appointments) {
  const dayObj = days.filter(dayElement => dayElement.name === day); 
  const spots = dayObj[0].appointments.filter(e => appointments[e].interview === null).length;
  const newDayObj = { ...dayObj[0], spots }
  const newArray =  days.map(item => item.name === day ? newDayObj : item);
  return newArray;
};