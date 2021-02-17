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