import React from "react"; 
import PropTypes from 'prop-types';

import InterviewerListItem from 'components/InterviewerListItem';

import "components/InterviewerListItem.scss"; 

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default function InterviewerList(props) {
  const interviewList = props.interviewers.map(interviewer => (
    <InterviewerListItem 
      key = {interviewer.id}
      name = {interviewer.name}
      avatar = {interviewer.avatar}
      selected = {interviewer.id === props.value}
      setInterviewer = {(event) => props.onChange(interviewer.id)}
    />
  )); 

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewList}</ul>
  </section>
  ); 
};



