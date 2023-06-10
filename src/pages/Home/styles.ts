import styled from "styled-components";

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`
export const ButtonCountdown = styled.button`
  width: 100%;

  color: ${props => props.theme["gray-100"]};
  border: none;
  outline: none;

  border-radius: 8px;

  padding: 1rem;
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;

  &:disabled{
    opacity: 0.7;
    cursor: not-allowed;
  }
`
export const PlayCountdownButton = styled(ButtonCountdown)`
  background: ${props => props.theme["green-500"]};

  &:not(:disabled):hover{
    background: ${props => props.theme["green-700"]};
    transition: 0.3s ease-in-out;
  }
`

export const StopCountdownButton = styled(ButtonCountdown)`
  background: ${props => props.theme["red-500"]};

  &:not(:disabled):hover{
    background: ${props => props.theme["red-700"]};
    transition: 0.3s ease-in-out;
  }
`