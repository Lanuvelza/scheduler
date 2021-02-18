import { useState } from 'react';

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    if (!replace) {
      setHistory([...history, mode]);
    }
    setMode(newMode);
  }

  function back() {
    if (history.length >= 1) {
      setMode(history.pop()); 
    }
  }

  return { 
    mode, 
    transition,
    back
  };
}