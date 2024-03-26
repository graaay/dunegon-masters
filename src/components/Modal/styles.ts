import styled, { css } from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const ModalContent = styled.div`
    background-color: rgb(39, 39, 39);
    padding: 20px;
    border-radius: 5px;
    min-width: 300px;
    box-shadow: 0 0 0.6rem black;
`;

export const ModalCloseButton = styled.div`
    width: auto;
    float: right;
    cursor: pointer;
`;