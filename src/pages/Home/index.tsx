import { Play } from "phosphor-react";
import { ButtonSubmit, CountdownContainer, FormContainer, HomeContainer, MinutesInput, Separator, TaskInput } from "./styles";
import {useForm} from 'react-hook-form'

export function Home(){

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

  function handleNewCycle(data: any){
    console.log(data);
    reset();
  }

  const task = watch('task');
  let isSubmitDisabled = !task;

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <ButtonSubmit disabled={isSubmitDisabled} type="submit">
          <Play /> Começar
        </ButtonSubmit>
      </form>

    </HomeContainer>
  )
}