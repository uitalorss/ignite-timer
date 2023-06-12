import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../context/CyclesContext";

export function Countdown(){
  const { activateCycle, activateCycleId, markCurrentCycleAsFinished, secondsPassed, handleSetSecondsPassed } = useContext(CyclesContext);


  const totalSeconds = activateCycle ? activateCycle.minutes * 60 : 0;
  const currentSeconds = activateCycle ? totalSeconds - secondsPassed : 0;
  const minutesAmout = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const valueMinutes = String(minutesAmout).padStart(2, '0');
  const valueSeconds = String(secondsAmount).padStart(2, '0');
  

  useEffect(() => {
    let interval: number;
    if(activateCycle){
      interval = setInterval(() => {
        let secondsDifference = differenceInSeconds(new Date(), activateCycle.dateStart);
        if(secondsDifference >= totalSeconds){
          markCurrentCycleAsFinished();
          handleSetSecondsPassed(totalSeconds);
          clearInterval(interval);
        }else{
          handleSetSecondsPassed(secondsDifference);
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval);
    }
  }, [activateCycle, totalSeconds, activateCycleId, handleSetSecondsPassed])

  useEffect(() => {
    if(activateCycle){
      document.title = `Ignite Timer ${valueMinutes}:${valueSeconds}`;
    } else {
      document.title = "Ignite Timer";
    }
  }, [valueMinutes, valueSeconds, activateCycle]);

  return (
    <CountdownContainer>
      <span>{valueMinutes[0]}</span>
      <span>{valueMinutes[1]}</span>
      <Separator>:</Separator>
      <span>{valueSeconds[0]}</span>
      <span>{valueSeconds[1]}</span>
  </CountdownContainer>
  )
}