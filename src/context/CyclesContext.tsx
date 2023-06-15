import { ReactNode, createContext, useReducer, useState } from "react";
import { ActionTypes, Cycle, cyclesReducer } from "../reducers/cyclesReducer";

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
  });
  const [secondsPassed, setSecondsPassed] = useState(0);

  const {cycles, activateCycleId} = cyclesState
  const activateCycle = cycles.find(cycle => cycle.id === activateCycleId);

  function markCurrentCycleAsFinished(){
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activateCycleId,
      },
    })
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
    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    });
    setSecondsPassed(0);
  }

  function interruptCycle(){
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      data: {
        activateCycleId,
      }
    })
  }

  return(
    <CyclesContext.Provider 
        value={{cycles, activateCycle, activateCycleId, markCurrentCycleAsFinished, secondsPassed, handleSetSecondsPassed, createNewCycle, interruptCycle}}>
          {children}
    </CyclesContext.Provider>
  )
}