import { ReactNode, createContext, useReducer, useState } from "react";

interface Cycle {
  id: string;
  task: string;
  minutes: number;
  dateStart: Date;
  interruptDate?: Date;
  finishDate?: Date;
}

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

interface CyclesState {
  cycles: Cycle[];
  activateCycleId: string | null;
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({children}: CyclesContextProviderProps){
  const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {
    switch(action.type){
      case 'ADD_NEW_CYCLE':
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activateCycleId: action.payload.newCycle.id
        };
      case 'INTERRUPT_CURRENT_CYCLE':
        return {
          ...state,
          cycles: state.cycles.map(cycle => {
            if(cycle.id === state.activateCycleId){
              return {...cycle, interruptDate: new Date()}
            } else{
              return cycle;
            }
          }),
          activateCycleId: null
        }
      case 'MARK_CURRENT_CYCLE_AS_FINISHED':
        return {
          ...state,
          cycles: state.cycles.map(cycle => {
            if(cycle.id === state.activateCycleId){
              return {...cycle, finishDate: new Date()}
            }else{
              return cycle;
            }
          }),
          activateCycleId: null
        }
      default:
        return state;
    }
  }, {
    cycles: [],
    activateCycleId: null
  });
  const [secondsPassed, setSecondsPassed] = useState(0);

  const {cycles, activateCycleId} = cyclesState
  const activateCycle = cycles.find(cycle => cycle.id === activateCycleId);

  function markCurrentCycleAsFinished(){
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
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
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    });
    setSecondsPassed(0);
  }

  function interruptCycle(){
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
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