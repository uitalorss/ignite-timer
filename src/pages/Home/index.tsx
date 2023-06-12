import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, PlayCountdownButton, StopCountdownButton } from "./styles";
import {FormProvider, useForm} from 'react-hook-form';
import { NewCycleForm } from "./NewCycleForm";
import { Countdown } from "./Countdown";
import { useContext } from "react";
import { CyclesContext } from "../../context/CyclesContext";



export function Home(){
  const {activateCycle, createNewCycle, interruptCycle} = useContext(CyclesContext);
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

  function handleCreateNewCycle(data: NewCycleFormData){
    createNewCycle(data);
    reset();
  }

  const task = watch('task');
  let isSubmitDisabled = !task;
  return(
    <HomeContainer>
      
        <form onSubmit={handleSubmit(handleCreateNewCycle)} action="" >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
          {activateCycle ? 
            <StopCountdownButton onClick={interruptCycle} type="button">
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