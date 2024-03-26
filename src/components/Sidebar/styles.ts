// SidebarStyles.ts
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Container principal da sidebar, usando rem para medidas escaláveis
export const MainContainer = styled.div`
    width: 15.625rem; // 250px convertido para rem
    min-height: 100vh;
    background-color: rgb(24, 24, 24);
`;

// Subcontainer para aplicar padding internamente
export const SubContainer = styled.div`
    padding: 0 1rem; // Padding uniforme nos lados
`;

// Header da Sidebar, com flex para alinhar itens
export const Header = styled.div`
    height: 6.25rem; // 100px convertido para rem
    display: flex;
    align-items: center;
    gap: 0.2rem;
    flex-direction: column;
`;

// Estilo para as imagens (logos) da Sidebar
export const LogoImage = styled.img`
    width: 5rem; // Preferi manter em px para controle de tamanho de imagem
    margin-top: 0.3rem;
`;

// Estilização para os links de navegação
export const StyledNavLink = styled(NavLink)`
    margin-top: 0.5rem;
    padding: 0.3rem 0 0.4rem 0.4rem;
    border: 0.063rem solid #474747; // 1px convertido para rem aproximadamente
    border-radius: 0.4rem;
    text-decoration: none;
    color: #9f9f9f;
    transition-duration: 0.2s;
    display: flex;
    gap: 0.5rem;
    background-color: transparent;

    &:hover {
        border-color: #ffe700;
        color: #ffe700;
    }

    &.active {
        background-color: #ffe600cc;
        color: black;
    }

    &:hover.active {
        background-color: #ffe600cc;
        color: black;
    }
`;

// Footer da Sidebar
export const Footer = styled.div`
    position: fixed;
    bottom: 0;
    width: 15.625rem; // Para assegurar que o footer acompanhe a largura do MainContainer

    span {
        font-size: 0.78rem;
        color: #999;
        text-align: center;
        display: block;
    }
`;
