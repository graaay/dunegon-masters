import styled, { css } from 'styled-components';
import { Note } from "phosphor-react";
export { GlowingButton } from '../../../components/index';

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

export const CardTables = styled.div`
    min-height: 10rem;
    background-color: rgb(58, 58, 58);
    border-radius: 0.3rem;
    box-shadow: 0px 0px 3px #1c1c1ccc;
    cursor: pointer;
    overflow: hidden;
    .table-form-div-wrapper {
        padding: 0.5rem 0.8rem;
        display: grid;

        .head-character {
            display: flex;
            min-width: 100%;
            justify-content: space-between;
        }
    }
`;
