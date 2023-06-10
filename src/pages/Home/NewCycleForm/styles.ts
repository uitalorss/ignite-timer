import styled from "styled-components"

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: .5rem;
  color: ${props => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: 700;
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: none;
  outline: none;
  font-size: 1.125rem;
  font-weight: 700;
  border-bottom: 2px solid ${props => props.theme["gray-500"]};
  padding: 0 0.5rem;
  color: ${props => props.theme["gray-100"]};
  &::placeholder{
    color: ${props => props.theme["gray-500"]};

  }

  &:focus{
    box-shadow: none;
    border-color: ${props => props.theme["green-500"]}
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;
`

export const MinutesInput = styled(BaseInput)`
  max-width: 4rem;
`