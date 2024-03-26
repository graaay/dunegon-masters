// Sidebar.tsx
import React from 'react';
import { Sword, User, Campfire } from "phosphor-react";
import Logo1 from "../../assets/logol1.jpg";
import { MainContainer, SubContainer, Header, LogoImage, StyledNavLink, Footer } from './styles'; // Importe os estilos
import { Divider } from "../Divider/styles"

function Sidebar() {
  return (
    <MainContainer>
        <SubContainer>
            <Header>
                <LogoImage src={Logo1} alt="Logo"/>
                <span> Abner Alexandre</span>
            </Header>
            <Divider marginTop='1rem' marginBottom='1.5rem'/>
            <nav>
                <StyledNavLink to="/">
                    <Sword size={20}/>
                    Combate
                </StyledNavLink>
                <StyledNavLink to="/tables"> 
                    <Campfire size={20}/>
                    Mesas
                </StyledNavLink>
                <StyledNavLink to="/characters"> 
                    <User size={20}/>
                    Personagens
                </StyledNavLink>
            </nav>
        </SubContainer>
        <Footer>
            <span> Developed by Abner Alexandre </span>
        </Footer>
    </MainContainer>
  );
}

export default Sidebar;
