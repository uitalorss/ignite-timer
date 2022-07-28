import styled from 'styled-components';

export type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'success'


interface ButtonContainerProps{
  variant: ButtonVariants;
}

const variants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green'
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  ${props => {
    return `background-color: ${variants[props.variant]}`
  }}
`