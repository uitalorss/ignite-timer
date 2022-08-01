import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, Separator } from "./styles";


export function Home(){
  return(
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <input id="task" type="text" placeholder="Dê um nome para o seu projeto" />
          <label htmlFor="counter">durante</label>
          <input id="counter" type="number" placeholder="- 00 +" />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <button type="submit">
          <Play /> Começar
        </button>
      </form>
    </HomeContainer>
  )
}