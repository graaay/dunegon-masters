import styled, { css } from 'styled-components';

interface ButtonPropos {
    padding?: string;
    width?: string;
    color?: string;
    backgroundColor?: string;
    hoverColor?: string;
    hoverBackgroundColor?: string;
    fontSize?: string;
    gap?: string;
    borderRadius?: string;
    transform?: string;
    border?: string;
}

export const Button = styled.button<ButtonPropos>`
    cursor: pointer;
    width: ${(props) => props.width || '100%'};
    display: flex;
    justify-content: center;
    gap: ${(props) => props.gap || '0.5rem'};
    font-size: ${(props) => props.fontSize || '1rem'};
    padding: ${(props) => props.padding || '0.3rem 0'};
    border-radius: ${(props) => props.borderRadius || '0.2rem'};
    border: 0;
    color: ${(props) => props.color || 'white'};
    background-color: ${(props) => props.backgroundColor || '#9f9f9f'};
    box-shadow: 0 0.1rem 0.2rem #272727;
    align-items: self-end;
    font-family: 'Montserrat',sans-serif;
    transition: 0.4s;
    border: ${(props) => props.border || ''};

    &:hover {
        filter: brightness(0.8);
        background-color: ${(props) => props.hoverBackgroundColor || props.backgroundColor || '#9f9f9f'};
        color: ${(props) => props.hoverColor || props.color || 'white'};
        transform: ${(props) => props.transform ?? ''};
    };

`;