import { Play } from "phosphor-react";
import { ButtonSubmit, CountdownContainer, FormContainer, HomeContainer, MinutesInput, Separator, TaskInput } from "./styles";

export function Home(){
  return(
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput type="text" id="task" placeholder="Dê um nome para o seu projeto"/>
          <label htmlFor="timer">durante</label>
          <MinutesInput step={5} min={5} max={60} type="number" id="timer" placeholder="00"/>
          <span className="minutes">minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <ButtonSubmit type="submit">
          <Play /> Começar
        </ButtonSubmit>
      </form>

    </HomeContainer>
  )
}