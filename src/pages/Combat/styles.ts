import styled from 'styled-components';
export { Divider, GlowingButton, Button, InputFloatingLabel as Input } from '../../components/index';

interface TurnoWrapperProps {
    justifyContent?: string;
}

export const TurnoWrapper = styled.div<TurnoWrapperProps>`
    display: flex;
    align-items: baseline;
    width: 100%;
    gap: 0.3rem;
    justify-content: ${(props) => props.justifyContent || 'start'};
    border-radius: 5px;

    h2 {
        color: #ffe600;
    }
`;

export const TableCombat = styled.table`
    border-collapse: collapse;
    width: 100%;
    box-shadow: 0 0 0.3rem #000000b8;
    transition: heigth 0.4s;

    tr {
        border-bottom: 1px solid #ffffff3b;
        transition: background-color 0.4s;
    }

    tr input {
        transition: background-color 0.4s;
    }

    thead > tr {
        background-color: #404040;
    }

    tbody > tr {
        background-color: #272727;
    }

    th {
        text-align: left;
    }

    th , td {
        padding: 1rem 0.35rem;
    }

    .player-atual {
        background-color: #ffe600;
        color: black;
        font-weight: 600;
        font-size: 18px;

        & input {
            background-color: transparent;
            color: black;
            border: 1px solid black;
        }

        & button {
            border: none;
        }
    }
`;

export const FloatingCombatentes = styled.div`
    box-shadow: 0 0 0.3rem #00000082;
    height: 9.2rem;
    background-color: #323232;

    section {
        padding: 0.5rem;

        h1, h3 {
            /* text-align: center; */
            font-weight: 500;
            color: #ffe600;
        }
    }
`;

export const ColunasMenoresCombat = styled.th`
    width: 5.625rem;
`;

export const CondicoesWaraper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: auto;
`;

export const CondicoesChip = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 0 0.3rem #00000082;
    width: auto;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: #ac2727;
    color: white;
    cursor: pointer;
`;

export const DividerWrapper = styled.div`
    display: flex;
    min-height: 100%;
    justify-content: space-between;
    align-items: baseline;
`;