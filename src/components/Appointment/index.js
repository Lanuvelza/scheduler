import React, { useEffect } from "react"; 

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status"; 
import Confirm from "./Confirm";
import Error from "./Error";

import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY"; 
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFRIM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY); 
    }
  }, [props.interview, transition, mode]);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((error) => transition(ERROR_SAVE, true));
  };

  function onDelete() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((error) => transition(ERROR_DELETE, true));
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

  {mode === SHOW && props.interview && (
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
      interviewer={props.interview.interviewer.id}
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

  {mode === ERROR_SAVE && (
    <Error 
      message="Could not save appointment."
      onClose={() => back()}
    />
  )}

  {mode === ERROR_DELETE && (
    <Error 
      message="Could not delete appointment."
      onClose={() => back()}
    />
  )}
  </article>
  ); 
}