import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cyclesReducer";
import { addNewCycleAction, finishCycleAction, interruptCycleAction } from "../reducers/actions";
import { differenceInSeconds } from "date-fns";

interface CyclesContextType {
  cycles: Cycle[];
  activateCycle: Cycle | undefined;
  activateCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
  secondsPassed: number;
  handleSetSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CycleFormData) => void;
  interruptCycle: () => void;
}

interface CycleFormData {
  task: string;
  minutes: number
}

interface CyclesContextProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({children}: CyclesContextProviderProps){
  const [cyclesState, dispatch] = useReducer(cyclesReducer,
  {
    cycles: [],
    activateCycleId: null
  }, (initialState) => {
    const data = localStorage.getItem('@ignite-time:cycles-state-1.0');
    if(data){
      return JSON.parse(data);
    }

    return initialState
  });
  const {cycles, activateCycleId} = cyclesState
  const activateCycle = cycles.find(cycle => cycle.id === activateCycleId);

  const [secondsPassed, setSecondsPassed] = useState(() => {
    if(activateCycle){
      return differenceInSeconds(new Date(), new Date(activateCycle.dateStart))
    }
    return 0;
  });

  
  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-time:cycles-state-1.0', stateJSON);
  }, [cyclesState])

  function markCurrentCycleAsFinished(){
    dispatch(finishCycleAction())
  }
  
  function handleSetSecondsPassed(seconds: number){
    setSecondsPassed(seconds);
  }

  function createNewCycle(data: CycleFormData){
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutes: data.minutes,
      dateStart: new Date()
    }
    dispatch(addNewCycleAction(newCycle));
    setSecondsPassed(0);
  }

  function interruptCycle(){
    dispatch(interruptCycleAction());
  }

  return(
    <CyclesContext.Provider 
        value={{cycles, activateCycle, activateCycleId, markCurrentCycleAsFinished, secondsPassed, handleSetSecondsPassed, createNewCycle, interruptCycle}}>
          {children}
    </CyclesContext.Provider>
  )
}