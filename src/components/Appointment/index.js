import React from "react"; 

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status"; 
import Confirm from "./Confirm";

import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY"; 
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFRIM";
const EDIT = "EDIT";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  };

  function onDelete() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY));
  };

  return (
  <article className="appointment">
    <Header 
      time = {props.time}
    /> 
  {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
  {mode === CONFIRM && (
    <Confirm 
      onCancel={() => back()}
      onConfirm={onDelete}
      message="Are you sure would like to delete?"
    />
  )}

  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onEdit={() => transition(EDIT)}
      onDelete={() => transition(CONFIRM)}
    />
  )}

  {mode === CREATE && (
    <Form 
      interviewers={props.interviewers}
      onSave={save}
      onCancel={() => back()}
    /> 
  )}

  {mode === EDIT && (
    <Form 
      name={props.interview.student}
      interviewers={props.interviewers}
      onSave={save}
      onCancel={() => back()}
    />
  )}

  {mode === SAVING && (
    <Status 
      message="Saving"
    /> 
  )}

  {mode === DELETING && (
    <Status 
      message="Deleting"
    /> 
  )}
  </article>
  ); 
}