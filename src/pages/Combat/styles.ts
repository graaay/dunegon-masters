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
        color: #ffe600cc;
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
        background-color: #ffe600cc;
        color: black;
        font-weight: 600;
        font-size: 18px;

        & input {
            background-color: #ffe600cc;
            color: black;
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
            color: #ffe600cc;
        }
    }
`;

export const ColunasMenoresCombat = styled.th`
    width: 5.625rem;
`;