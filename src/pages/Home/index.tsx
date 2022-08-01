import { Play } from "phosphor-react";
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
  return(
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="task" type="text" placeholder="Dê um nome para o seu projeto" />
          <label htmlFor="counter">durante</label>
          <MinutesInput id="counter" type="number" placeholder="00" />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <CountdownButton type="submit">
          <Play /> Começar
        </CountdownButton>
      </form>
    </HomeContainer>
  )
}