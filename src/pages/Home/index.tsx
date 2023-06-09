import { HandPalm, Play } from "phosphor-react";
import {CountdownContainer, FormContainer, HomeContainer, MinutesInput, PlayCountdownButton, Separator, StopCountdownButton, TaskInput } from "./styles";
import {useForm} from 'react-hook-form';
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns';

interface Cycle {
  id: string;
  task: string;
  minutes: number;
  dateStart: Date;
  interruptDate?: Date;
  finishDate?: Date;
}

export function Home(){
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activateCycleId, setActivateCycleId] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);

  const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
    defaultValues:{
      task: '',
      minutes: 0
    }
  });

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

  const activateCycle = cycles.find(cycle => cycle.id === activateCycleId);
  
  const totalSeconds = activateCycle ? activateCycle.minutes * 60 : 0;
  const currentSeconds = activateCycle ? totalSeconds - secondsPassed : 0;
  const minutesAmout = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const valueMinutes = String(minutesAmout).padStart(2, '0');
  const valueSeconds = String(secondsAmount).padStart(2, '0');

  const task = watch('task');
  let isSubmitDisabled = !task;

  useEffect(() => {
    let interval: number;
    if(activateCycle){
      interval = setInterval(() => {
        let secondsDifference = differenceInSeconds(new Date(), activateCycle.dateStart);
        if(secondsDifference >= totalSeconds){
          setCycles(cycles.map(cycle => {
            if(cycle.id === activateCycleId){
              return {...cycle, finishDate: new Date()}
            } else{
              return cycle
            }
          }),
          )
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        }else{
          setSecondsPassed(secondsDifference);
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval);
    }
  }, [activateCycle, totalSeconds, activateCycleId])

  useEffect(() => {
    if(activateCycle){
      document.title = `Ignite Timer ${valueMinutes}:${valueSeconds}`
    } else {
      document.title = "Ignite Timer"
    }
  }, [valueMinutes, valueSeconds, activateCycle])

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
      <form onSubmit={handleSubmit(handleNewCycle)} action="" >
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            type="text" 
            id="task" 
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activateCycle} 
            {...register('task')}/>
          <label htmlFor="timer">durante</label>
          <MinutesInput 
            step={5} min={5} max={60} 
            type="number" 
            id="timer" 
            placeholder="00"
            disabled={!!activateCycle}
            {...register('minutes', {valueAsNumber: true}) }/>
          <span className="minutes">minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>{valueMinutes[0]}</span>
          <span>{valueMinutes[1]}</span>
          <Separator>:</Separator>
          <span>{valueSeconds[0]}</span>
          <span>{valueSeconds[1]}</span>
        </CountdownContainer>
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
    </HomeContainer>
  )
}