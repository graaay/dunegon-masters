import styled, { css } from 'styled-components';
import { Note } from "phosphor-react";
export { Divider, GlowingButton, Button } from '../../../components/index';

export const MainTableForm = styled.div`
    display: flex;
    justify-content: center;
    width: 59.4rem;
    margin: auto;
    flex-direction: column;
    margin-block: 1rem;
`;

export const StyledForm = styled.form`
    display: grid;
    gap: 1.1rem;
`;

const buttonStyles = css`
    width: 100%;
    font-size: 1.2rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: white;
    border: none;
    cursor: pointer;
    box-shadow: 1px 1px 3px #00000075;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;

    &:hover {
        filter: brightness(1.2);
    }
`;

export const SaveButton = styled.button`
    ${buttonStyles}
    background-color: #0073ff;

    &:hover {
        background-color: #0073ffb9;
    }
`;

export const StartButton = styled.button`
    ${buttonStyles}
    background-color: #00ff008f;

    &:hover {
        background-color: #00ff0059;
    }
`;

export const CreateButton = styled.button`
    ${buttonStyles}
    background-color: #6767678f;

    &:hover {
        background-color: #67676757;
    }
`;

export const CustomCheckbox = styled.label`
    display: flex;
    flex-direction: column-reverse;
    gap: 0.5rem;

    input {
        display: none;
    }

    .checkmark {
        position: relative;
        top: 0;
        left: 0;
        height: 1.5rem;
        width: 1.5rem;
        background-color: transparent;
        border: 1px solid rgba(255, 255, 255, 0.521);
        display: inline-block;
        border-radius: 2px;
        margin-right: 10px;
        cursor: pointer;
        transition: 0.3s;
    }

    input:checked + .checkmark:before {
        content: '';
        position: absolute;
        left: 0.438rem;
        top: 1px;
        width: 0.4rem;
        height: 0.9rem;
        border: solid rgb(0 0 0 / 81%);
        border-width: 0 0.25rem 0.25rem 0;
        transform: rotate(45deg);
        background-color: transparent;
        transition: 0.3s;
    }

    input:checked + .checkmark {
        background-color: rgb(233, 198, 45);
    }

    input:checked ~ & {
        color: rgb(233, 198, 45) !important;
    }
`;

export const CardTables = styled.div`
    min-height: 10rem;
    background-color: rgb(58, 58, 58);
    border-radius: 0.3rem;
    box-shadow: 0px 0px 3px #1c1c1ccc;
    cursor: pointer;

    .table-form-div-wrapper {
        padding: 0.5rem 0.8rem;
        display: grid;
    }
`;

export const OpenFichaButton = styled(Note)`
    cursor: pointer;

    /* Adicione estilos adicionais aqui se necessário */
`;

