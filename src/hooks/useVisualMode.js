import { useState } from 'react';

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  // transitions to the next mode and adds to history if replace boolean is false
  function transition(newMode, replace) {
    if (!replace) {
      setHistory(prev => {
        return [...prev, newMode]
      }); 
    }
    setMode(newMode);
  };

  // goes back to the previous mode in history if history length > 1
  function back() {
    if (history.length > 1) {
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory.pop();
        setMode(newHistory[newHistory.length - 1]);
        return newHistory
      });
    }
  };
  
  return { 
    mode, 
    transition,
    back
  };
};
