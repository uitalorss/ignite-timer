import { ReactNode, createContext, useState } from "react";

interface Cycle {
  id: string;
  task: string;
  minutes: number;
  dateStart: Date;
  interruptDate?: Date;
  finishDate?: Date;
}

interface CyclesContextType {
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
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activateCycleId, setActivateCycleId] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);

  const activateCycle = cycles.find(cycle => cycle.id === activateCycleId);

  function markCurrentCycleAsFinished(){
    setCycles(cycles.map(cycle => {
      if(cycle.id === activateCycleId){
        return {...cycle, finishDate: new Date()}
      } else{
        return cycle;
      }
    }),
    )
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
    setCycles([...cycles, newCycle]);
    setActivateCycleId(newCycle.id);
    setSecondsPassed(0);
    //reset();
  }

  function interruptCycle(){
    setCycles(cycles.map(cycle => {
      if(cycle.id === activateCycleId){
        return {...cycle, interruptDate: new Date()}
      } else{
        return cycle
      }
    }),
    )
    setActivateCycleId(null)
  }


  return(
    <CyclesContext.Provider 
        value={{activateCycle, activateCycleId, markCurrentCycleAsFinished, secondsPassed, handleSetSecondsPassed, createNewCycle, interruptCycle}}>
          {children}
    </CyclesContext.Provider>

  )
}