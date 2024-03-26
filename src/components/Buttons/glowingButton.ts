import styled, { css, keyframes } from 'styled-components';

interface GlowingButtonProps {
    color?: string;
    width?: string;
}

const faultyFlicker = keyframes`
    0% {
        opacity: 0.1;
    }
    2% {
        opacity: 0.1;
    }
    4% {
        opacity: 0.5;
    }
    19% {
        opacity: 0.5;
    }
    21% {
        opacity: 0.1;
    }
    23% {
        opacity: 1;
    }
    80% {
        opacity: 0.5;
    }
    83% {
        opacity: 0.4;
    }

    87% {
        opacity: 1;
    }
`;

const borderFlicker = keyframes`
    0% {
        opacity: 0.1;
    }
    2% {
        opacity: 1;
    }
    4% {
        opacity: 0.1;
    }

    8% {
        opacity: 1;
    }
    70% {
        opacity: 0.7;
    }
    100% {
        opacity: 1;
    }
`;

const textFlicker = keyframes`
    0% {
        opacity: 0.1;
    }

    2% {
        opacity: 1;
    }

    8% {
        opacity: 0.1;
    }

    9% {
        opacity: 1;
    }

    12% {
        opacity: 0.1;
    }
    20% {
        opacity: 1;
    }
    25% {
        opacity: 0.3;
    }
    30% {
        opacity: 1;
    }

    70% {
        opacity: 0.7;
    }
    72% {
        opacity: 0.2;
    }

    77% {
        opacity: 0.9;
    }
    100% {
        opacity: 0.9;
    }
`;

export const GlowingButton = styled.button<GlowingButtonProps>`
    position: relative;
    color: ${({ color }) => color || 'hsl(186, 100%, 69%)'};
    cursor: pointer;
    padding: 0.35rem 1rem;
    border: 0.15rem solid ${({ color }) => color || 'hsl(186, 100%, 69%)'};
    border-radius: 0.45rem;
    background: none;
    perspective: 2rem;
    font-family: 'Montserrat',sans-serif;
    font-size: 1rem;
    font-weight: 900;
    letter-spacing: 0.4rem;
    box-shadow: inset 0 0 0.5rem ${({ color }) => color || 'hsl(186, 100%, 69%)'}, 0 0 0.5rem ${({ color }) => color || 'hsl(186, 100%, 69%)'};
    animation: ${borderFlicker} 2s linear infinite;
    width: ${({ width }) => width || 'auto'};

    &:hover {
        color: rgba(0, 0, 0, 0.8);
        text-shadow: none;
        animation: none;

        .faulty-letter {
            animation: none;
            text-shadow: none;
            opacity: 1;
        }

        &:before {
            filter: blur(1.5rem);
            opacity: 1;
        }

        &:after {
            opacity: 1;
        }
    }

    &:hover .glowing-txt{
      animation: none;
    }


    &:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0.7;
        filter: blur(1rem);
        transform: translateY(120%) rotateX(95deg) scale(1, 0.35);
        background: ${({ color }) => color || 'hsl(186, 100%, 69%)'};
        pointer-events: none;
    }

    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: -1;
        background-color: ${({ color }) => color || 'hsl(186, 100%, 69%)'};
        box-shadow: 0 0 2rem 0.2rem ${({ color }) => color || 'hsl(186, 100%, 69%)'};
        transition: opacity 100ms linear;
    }

    .glowing-txt {
        text-shadow: 0 0 0.125rem hsl(0 0% 100% / 0.3), 0 0 0.45rem ${({ color }) => color || 'hsl(186, 100%, 69%)'};
        animation: ${textFlicker} 3s linear infinite;
    }

    .faulty-letter {
        opacity: 0.5;
        animation: ${faultyFlicker} 2s linear infinite;
    }

    @media only screen and (max-width: 37.5rem) {
        font-size: 1rem;
    }
`;