import { Play } from "phosphor-react";
import { useForm } from "react-hook-form"
import { 
  CountdownButton, 
  CountdownContainer, 
  FormContainer, 
  HomeContainer, 
  MinutesInput, 
  Separator, 
  TaskInput
} from "./styles";

export function Home(){
  const {register, handleSubmit, watch} = useForm();

  function handleNewCycle(data){
    console.log(data)
  }
  const task = watch('task');
  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            type="text" 
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />
          <label htmlFor="counter">durante</label>
          <MinutesInput 
            id="counter" 
            type="number" 
            placeholder="00"
            step={5}
            min={5}
            max={60} 
            {...register('minutesInput', {valueAsNumber: true})}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <CountdownButton disabled={!task} type="submit">
          <Play /> Começar
        </CountdownButton>
      </form>
    </HomeContainer>
  )
}