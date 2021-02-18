// Returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  const appointments = []
  if (!state.days.length) {
    return appointments;
  }
  const filteredDay = state.days.filter(dayElement => dayElement.name === day) 
  if (!filteredDay.length) {
    return appointments;
  }
  filteredDay[0].appointments.forEach((appointment) => {
    appointments.push(state.appointments[appointment]); 
  })
  return appointments; 
}

// returns the interview information 
export function getInterview(state, interview) {
  const interviewInfo = {}
  if (!interview) {
    return null;
  }
  interviewInfo.student = interview.student
  interviewInfo.interviewer = state.interviewers[interview.interviewer];
  return interviewInfo; 
}

// returns an array of interviewers for that day
export function getInterviewersForDay(state, day) {
  const interviewers = []
  if (!state.days.length) {
    return interviewers;
  }
  const filteredDay = state.days.filter(dayElement => dayElement.name === day) 
  if (!filteredDay.length) {
    return interviewers;
  }
  filteredDay[0].interviewers.forEach((interviewer) => {
    interviewers.push(state.interviewers[interviewer]); 
  })
  return interviewers; 
}
