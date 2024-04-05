// Sidebar.tsx
import React from 'react';
import { Sword, User, Campfire, SignOut } from "phosphor-react";
import Logo1 from "../../assets/logol1.jpg";
import { MainContainer, SubContainer, Header, LogoImage, StyledNavLink, Footer } from './styles'; // Importe os estilos
import { Divider } from "../Divider/styles";
import { useAuth } from '../../contexts/AuthContext';

function Sidebar() {

    const { logout } = useAuth();

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
                <nav>
                    <StyledNavLink to="/login" onClick={logout} style={{marginLeft: '1rem', marginRight: '1rem'}}>
                        <SignOut size={20}/>
                        Sair
                    </StyledNavLink>
                    <Divider marginTop='0.5rem' color='transparent' />
                </nav>
                <span> Developed by Abner Alexandre </span>
            </Footer>
        </MainContainer>
    );
}

export default Sidebar;
