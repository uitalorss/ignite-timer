import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, PlayCountdownButton, StopCountdownButton } from "./styles";
import {FormProvider, useForm} from 'react-hook-form';
import { createContext, useState } from "react";
import { NewCycleForm } from "./NewCycleForm";
import { Countdown } from "./Countdown";

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
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home(){
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activateCycleId, setActivateCycleId] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);

  const newCycleForm = useForm<NewCycleFormData>({
    defaultValues:{
      task: '',
      minutes: 0
    }
  });

  const {handleSubmit, watch, reset} = newCycleForm;

  interface NewCycleFormData {
    task: string;
    minutes: number
  }

  function handleNewCycle(data: NewCycleFormData){
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutes: data.minutes,
      dateStart: new Date()
    }
    setCycles([...cycles, newCycle]);
    setActivateCycleId(newCycle.id);
    setSecondsPassed(0);
    reset();
  }

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

  const activateCycle = cycles.find(cycle => cycle.id === activateCycleId);

  const task = watch('task');
  let isSubmitDisabled = !task;

  function handleInterruptCycle(){
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
    <HomeContainer>
      <CyclesContext.Provider 
        value={{activateCycle, activateCycleId, markCurrentCycleAsFinished, secondsPassed, handleSetSecondsPassed}}>
        <form onSubmit={handleSubmit(handleNewCycle)} action="" >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
          {activateCycle ? 
            <StopCountdownButton onClick={handleInterruptCycle} type="button">
              <HandPalm /> Interromper
            </StopCountdownButton>
            :
            <PlayCountdownButton disabled={isSubmitDisabled} type="submit">
              <Play /> Começar
            </PlayCountdownButton>
          }
        </form>
      </CyclesContext.Provider>
    </HomeContainer>
  )
}