import { Scroll, Timer } from 'phosphor-react'
import LogoIgnite from '../../assets/logo.svg'
import { HeaderContainer } from './styles'
import { NavLink } from 'react-router-dom'

export function Header(){
  return(
    <HeaderContainer>
      <img src={LogoIgnite} alt="" />
      <nav>
        <NavLink to='/' title='Timer'>
          <Timer size={24}/>
        </NavLink>
        <NavLink to='/history' title='Timer'>
          <Scroll size={24}/>
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}