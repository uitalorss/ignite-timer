import { useContext } from "react";
import { FormContainer, MinutesInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../context/CyclesContext";

export function NewCycleForm(){
  const {activateCycle} = useContext(CyclesContext);
  const {register} = useFormContext();

  return(
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
  )
}