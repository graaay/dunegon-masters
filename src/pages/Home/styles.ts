// HomePageStyles.ts
import styled from 'styled-components';
import { Divider } from '../../components/Divider/styles'; // Ajuste o caminho conforme necessário

export const ContainerHome = styled.div`
    padding: 0.5rem;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
`;

export const ContainerHomeComponent = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto;
`;

export const TitleApresentation = styled.h1`
    letter-spacing: 0.60rem;
    width: 100%;
`;

export const DestaqueFontHome = styled.h1`
    color: #ffe600cc;
    letter-spacing: 2px;
`;

export const Section = styled.section`
    height: auto;

    > span {
        display: block;
        width: 100%;
        margin-bottom: 0.8rem;
    }
`;

export const HomeCardContainer = styled.section`
    display: block;
    width: 100%;
`;

export const CardHomeApresentation = styled.div`
    gap: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
`;

export const FloatingCardApresentation = styled.div`
    color: black;
    height: 11rem;
    background-color: #ffe600cc;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.486);
`;

export const FloatingCardBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    text-align: center;
`;

// Reexportando DynamicHR para uso fácil
export { Divider };
