import { Play } from "phosphor-react";
import { ButtonSubmit, CountdownContainer, FormContainer, HomeContainer, MinutesInput, Separator, TaskInput } from "./styles";
import {useForm} from 'react-hook-form';
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns';

interface Cycle {
  id: string;
  task: string;
  minutes: number;
  dateStart: Date;
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
        setSecondsPassed(differenceInSeconds(new Date(), activateCycle.dateStart),);
      }, 1000)
    }
    return () => {
      clearInterval(interval);
    }
  }, [activateCycle])


  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycle)} action="" >
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            type="text" 
            id="task" 
            placeholder="Dê um nome para o seu projeto" 
            {...register('task')}/>
          <label htmlFor="timer">durante</label>
          <MinutesInput 
            step={5} min={5} max={60} 
            type="number" 
            id="timer" 
            placeholder="00"
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
        <ButtonSubmit disabled={isSubmitDisabled} type="submit">
          <Play /> Começar
        </ButtonSubmit>
      </form>

    </HomeContainer>
  )
}