import styled from 'styled-components';

interface InputProps {
    borderColor?: string;
    labelColor?: string;
    focusLabelColor?: string;
    backgroundColor?: string;
}

export const InputFloatingLabel = styled.div<InputProps>`
    position: relative;
    width: 100%;
    font-family: 'Montserrat',sans-serif;

    & > input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid ${(props) => props.borderColor || 'lightgray'};
        border-radius: 0.4rem;
        background-color: ${(props) => props.backgroundColor || '#272727'};
        color: white;
        font-size: 1.2rem;
        outline: none;
        transition: border-color 0.2s;
    }

    & > label {
        position: absolute;
        left: 0.8rem;
        bottom: 0.5rem;
        font-size: 1.2rem;
        color: ${(props) => props.labelColor || 'lightgray'};
        background-color: ${(props) => props.backgroundColor || '#272727'};
        padding: 0 0.4rem;
        transition: all 0.2s ease-in-out;
        pointer-events: none;
    }

    & > input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    & > input[type="number"] {
         -moz-appearance: textfield;
    }

    & > input:not(:placeholder-shown) ~ label,
    & > input:focus ~ label,
    & > input.filled ~ label {
        transform: translateY(-1.5rem);
        font-size: 1rem;
        color: ${(props) => props.focusLabelColor || '#ffe600cc'};
    }
`;